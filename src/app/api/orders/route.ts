import { db } from "@/db";
import { clientOrders } from "@/db/schema";
import { type CreateOrderType } from "@/ui/create-order-form";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
