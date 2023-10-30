import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clientOrders } from "@/lib/db/schema";
import { type CreateOrderType } from "@/components/create-order-form";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const orders = await db
      .select()
      .from(clientOrders)
      .where(eq(clientOrders.isActive, true));

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  const { name, phoneNumber, source }: CreateOrderType = await request.json();

  try {
    await db.insert(clientOrders).values({
      name,
      phoneNumber,
      source,
    });

    if (process.env.NODE_ENV === "production") {
      revalidatePath("/crm/(sections)/orders");
    }

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
