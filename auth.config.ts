import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split("\n");

const PROTECTED_ROUTES = [
  "/dashboard",
  "/compilations",
  "/customers",
  "/documents",
];

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;

      const isOnProtectedRoute = PROTECTED_ROUTES.some((protectedRoute) => {
        return nextUrl.pathname.startsWith(protectedRoute);
      });
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      const isOnHomePage = nextUrl.pathname === "/";
      const isOnProtectedApi = nextUrl.pathname.startsWith("/api");

      if (isOnProtectedRoute && isLoggedIn) return true;

      if (isOnProtectedRoute && !isLoggedIn) {
        const callbackUrl = nextUrl.href;
        const redirectUrl = new URL(
          `/login?callbackUrl=${callbackUrl}`,
          nextUrl,
        );
        // Redirect unauthenticated users to login page.
        return NextResponse.redirect(redirectUrl);
      }

      if ((isOnLoginPage && isLoggedIn) || (isOnHomePage && isLoggedIn)) {
        const dashboardUrl = new URL("/dashboard", nextUrl);
        return NextResponse.redirect(dashboardUrl);
      }

      const origin = request.headers.get("origin");
      const allowedOrigin = origin && ALLOWED_ORIGINS?.includes(origin);

      if (isOnProtectedApi) {
        if (allowedOrigin) return true;

        if (isLoggedIn && allowedOrigin) return true;
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
