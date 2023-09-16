import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientOrders } from "@/lib/db/schema";
import { type CreateOrderType } from "@/components/create-order-form";

export async function POST(request: NextRequest) {
  const { name, phoneNumber, source }: CreateOrderType = await request.json();

  try {
    await db.insert(clientOrders).values({
      name,
      phoneNumber,
      source,
    });

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
