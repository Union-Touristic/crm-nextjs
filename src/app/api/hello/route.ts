import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "hello" });
}

export async function POST(request: Request) {
  const { data } = await request.json();
  console.log("=======data========");
  console.log(data);

  return NextResponse.json({ message: "Success" });
}
