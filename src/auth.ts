import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const validRoles = [
  "SUPER_ADMIN",
  "ADMIN",
  "MEMBER",
] as const;

const validStatuses = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "BLOCKED",
] as const;

type AppRole = (typeof validRoles)[number];
type AppStatus = (typeof validStatuses)[number];

function isAppRole(value: unknown): value is AppRole {
  return (
    typeof value === "string" &&
    validRoles.includes(value as AppRole)
  );
}

function isAppStatus(
  value: unknown
): value is AppStatus {
  return (
    typeof value === "string" &&
    validStatuses.includes(value as AppStatus)
  );
}

export const { handlers, auth, signIn, signOut } =
  NextAuth({
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
          const email =
            credentials?.email as
              | string
              | undefined;

          const password =
            credentials?.password as
              | string
              | undefined;

          if (!email || !password) {
            return null;
          }

          const user =
            await prisma.user.findUnique({
              where: {
                email,
              },
            });

          if (!user) {
            throw new Error(
              "User not found"
            );
          }

          const validPassword =
            await bcrypt.compare(
              password,
              user.password
            );

          if (!validPassword) {
            throw new Error(
              "Invalid password"
            );
          }

          if (
            user.status !== "APPROVED"
          ) {
            throw new Error(
              "Your account is pending approval"
            );
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
          token.role = user.role;
          token.status = user.status;
        }

        return token;
      },

      async session({
        session,
        token,
      }) {
        if (session.user) {
          session.user.id =
            token.sub || "";

          if (isAppRole(token.role)) {
            session.user.role =
              token.role;
          } else {
            session.user.role =
              "MEMBER";
          }

          if (
            isAppStatus(token.status)
          ) {
            session.user.status =
              token.status;
          } else {
            session.user.status =
              "PENDING";
          }
        }

        return session;
      },
    },

    secret:
      process.env.NEXTAUTH_SECRET,
  });