import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

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
      // TODO: implement /api route
      // const isOnProtectedApi = false;

      if (isOnProtectedRoute && isLoggedIn) return true;

      if (isOnProtectedRoute && !isLoggedIn) {
        const callbackUrl = nextUrl.href;
        const redirectUrl = new URL(
          `/login?callbackUrl=${callbackUrl}`,
          nextUrl
        );
        // Redirect unauthenticated users to login page.
        return NextResponse.redirect(redirectUrl);
      }

      if (isOnLoginPage && isLoggedIn) {
        const dashboardUrl = new URL("/dashboard", nextUrl);
        return NextResponse.redirect(dashboardUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
