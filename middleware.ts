import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://uniontouristic.kz"]
    : ["http://localhost:3000"];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (
    (origin && !allowedOrigins.includes(origin)) ||
    (!origin && process.env.NODE_ENV === "production")
  ) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const res = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    res.headers.append("Access-Control-Allow-Origin", origin);
  }

  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, Content-Type"
  );

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
