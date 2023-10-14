import { withAuth } from "next-auth/middleware";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split("\n");

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const origin = req.headers.get("origin");
      if (origin && allowedOrigins?.includes(origin)) {
        return true;
      }

      if (token) return true;
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/api/:path*", "/crm/dashboard"],
};
