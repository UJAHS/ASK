import { auth } from "@/auth";
import { NextResponse } from "next/server";

const locales = ["en", "hi", "gu"];

function getLocale(pathname: string) {
  const firstSegment = pathname.split("/")[1];

  if (locales.includes(firstSegment)) {
    return firstSegment;
  }

  return "en";
}

function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/");

  if (locales.includes(segments[1])) {
    return (
      "/" +
      segments
        .slice(2)
        .filter(Boolean)
        .join("/")
    );
  }

  return pathname;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const locale = getLocale(pathname);
  const cleanPath = getPathWithoutLocale(pathname);

  const isAuthenticated = !!session;

  const role = session?.user
    ? String(
        (session.user as { role?: string }).role || ""
      )
    : "";

  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN";

  const isMember = role === "MEMBER";

  /*
   * Add locale automatically when the URL
   * does not contain one.
   */
  if (
    pathname === "/" ||
    (!pathname.startsWith("/en/") &&
      !pathname.startsWith("/hi/") &&
      !pathname.startsWith("/gu/") &&
      pathname !== "/en" &&
      pathname !== "/hi" &&
      pathname !== "/gu")
  ) {
    const url = req.nextUrl.clone();

    url.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(url);
  }

  /*
   * ADMIN PROTECTION
   */
  if (cleanPath.startsWith("/admin")) {
    if (cleanPath === "/admin/login") {
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      const loginUrl = new URL(
        `/${locale}/admin/login`,
        req.url
      );

      loginUrl.searchParams.set(
        "callbackUrl",
        pathname
      );

      return NextResponse.redirect(loginUrl);
    }

    if (!isAdmin) {
      return NextResponse.redirect(
        new URL(
          `/${locale}/unauthorized`,
          req.url
        )
      );
    }
  }

  /*
   * MEMBER DASHBOARD / MEMBER AREA PROTECTION
   */
  if (cleanPath.startsWith("/member")) {
    if (!isAuthenticated) {
      const loginUrl = new URL(
        `/${locale}/login`,
        req.url
      );

      loginUrl.searchParams.set(
        "callbackUrl",
        pathname
      );

      return NextResponse.redirect(loginUrl);
    }

    if (!isMember) {
      return NextResponse.redirect(
        new URL(
          `/${locale}/unauthorized`,
          req.url
        )
      );
    }
  }

  /*
   * PUBLIC MEMBERS DIRECTORY
   *
   * Only authenticated MEMBERS can access this page.
   */
  if (cleanPath.startsWith("/members")) {
    if (!isAuthenticated) {
      const loginUrl = new URL(
        `/${locale}/login`,
        req.url
      );

      loginUrl.searchParams.set(
        "callbackUrl",
        pathname
      );

      return NextResponse.redirect(loginUrl);
    }

    if (!isMember) {
      return NextResponse.redirect(
        new URL(
          `/${locale}/unauthorized`,
          req.url
        )
      );
    }
  }

  /*
   * MATRIMONIAL PROTECTION
   *
   * Only authenticated MEMBERS can access
   * matrimonial profiles.
   */
  if (cleanPath.startsWith("/matrimonial")) {
    if (!isAuthenticated) {
      const loginUrl = new URL(
        `/${locale}/login`,
        req.url
      );

      loginUrl.searchParams.set(
        "callbackUrl",
        pathname
      );

      return NextResponse.redirect(loginUrl);
    }

    if (!isMember) {
      return NextResponse.redirect(
        new URL(
          `/${locale}/unauthorized`,
          req.url
        )
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/en",
    "/en/:path*",
    "/hi",
    "/hi/:path*",
    "/gu",
    "/gu/:path*",
    "/admin/:path*",
    "/member/:path*",
    "/en/members/:path*",
    "/hi/members/:path*",
    "/gu/members/:path*",
    "/en/matrimonial/:path*",
    "/hi/matrimonial/:path*",
    "/gu/matrimonial/:path*",
  ],
};