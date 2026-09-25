import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
      status: "PENDING" | "APPROVED" | "REJECTED" | "BLOCKED";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
    status: "PENDING" | "APPROVED" | "REJECTED" | "BLOCKED";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
    status?: "PENDING" | "APPROVED" | "REJECTED" | "BLOCKED";
  }
}
