import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        console.log("Entered Email:", credentials.email);

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("Database User:", user);

        if (!user) {
          throw new Error("User not found");
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Password Valid:", validPassword);
        console.log("User Status:", user.status);

        if (!validPassword) {
          throw new Error("Invalid password");
        }

        if (user.status !== "APPROVED") {
          throw new Error("Your account is pending approval");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/admin/dashboard`;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };