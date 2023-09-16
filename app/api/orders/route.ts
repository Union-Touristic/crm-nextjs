import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientOrders } from "@/lib/db/schema";
import { Order } from "@/components/create-order-form";

export async function POST(request: NextRequest) {
  const {
    order_name: name,
    order_phone: phoneNumber,
    order_source: source,
  }: Order = await request.json();

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
