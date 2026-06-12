import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return (
        token?.role === "SUPER_ADMIN" ||
        token?.role === "ADMIN"
      );
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};