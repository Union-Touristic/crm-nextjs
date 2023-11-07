import { db } from "@/lib/db";
import { clientOrders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } },
) {
  const orderId = Number(params.orderId);

  try {
    await db
      .update(clientOrders)
      .set({ isActive: false })
      .where(eq(clientOrders.id, orderId));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
  }
}
