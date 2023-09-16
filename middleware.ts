import { NextResponse, NextRequest } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://uniontouristic.kz", "https://crm-nextjs-plum.vercel.app"]
    : ["http://localhost:3000", "http://localhost:8000"];

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
    res.headers.append("Access-Control-Allow-Credentials", "true");
    res.headers.append("Access-Control-Allow-Origin", origin);
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );
    res.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
  }

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
