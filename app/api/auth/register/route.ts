import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    // validate email and password;
    console.log({ email, password });

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({
      email,
      password,
    });
  } catch (error) {
    console.log({ error });
  }
}
