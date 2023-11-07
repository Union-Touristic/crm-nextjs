import { CallbackForm } from "@/lib/definitions";
import { NextResponse } from "next/server";
import { default as twilio } from "twilio";

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BOT_API_TOKEN = process.env.TELEGRAM_BOT_API_TOKEN;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function GET() {}

export async function POST(request: Request) {
  const { name, phone }: CallbackForm = await request.json();

  if (!name) {
    return new NextResponse(
      JSON.stringify({
        message: "Missing name field",
        code: "MISSING_NAME_FIELD",
        type: "REQUEST_ERROR",
      }),
      { status: 400 },
    );
  }

  if (!phone) {
    return new NextResponse(
      JSON.stringify({
        message: "Missing phone field",
        code: "MISSING_PHONE_FIELD",
        type: "REQUEST_ERROR",
      }),
      { status: 400 },
    );
  }

  // TODO: Validate phone number via Twilio
  const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  try {
    const phoneNumberInstance = await twilioClient.lookups.v2
      .phoneNumbers(phone)
      .fetch();

    if (!phoneNumberInstance.valid) {
      return new NextResponse(
        JSON.stringify({
          message: "Phone number is not valid",
          code: "PHONE_NUMBER_NOT_VALID",
          type: "VALIDATION_ERROR",
        }),
        { status: 400 },
      );
    }

    const text = `Новая заявка с сайта: ${name} ${phoneNumberInstance.phoneNumber}`;
    const telegramURL = `https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    if (telegramResponse.statusText === "OK") {
      return new NextResponse(null, { status: 201 });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong on the server",
        code: "INTERNAL_SERVER_ERROR",
      }),
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ name, phone, status: "ok" });
}
