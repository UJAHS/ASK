"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/api/auth/signin",
        })
      }
      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}