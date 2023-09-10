import { NextResponse } from "next/server";
import { CallbackForm } from "@/types/types";

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BOT_API_TOKEN = process.env.TELEGRAM_BOT_API_TOKEN;

export async function GET() {}

export async function POST(request: Request) {
  const { name, phone }: CallbackForm = await request.json();

  if (!name || !phone) {
    return NextResponse.json({ message: "Missing required data." });
  }

  const text = `Новая заявка с сайта: ${name} ${phone}`;
  const telegramURL = `https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`;

  const sendMessageTelegram = await fetch(telegramURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });

  if (sendMessageTelegram.statusText === "OK") {
    return NextResponse.json({ name, phone, status: "ok" });
  }

  return NextResponse.json({ message: "Something went wrong" });
}
