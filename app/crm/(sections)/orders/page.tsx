import type { Metadata } from "next";
import Title from "../_components/Title";
import { db } from "@/lib/db";
import { clientOrders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const orders = await db
    .select()
    .from(clientOrders)
    .where(eq(clientOrders.isActive, true));

  return (
    <>
      <Title>Orders</Title>
      <div className="py-4">
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">
          {orders.map((order) => {
            return <div key={order.id}>{order.name}</div>;
          })}
        </div>
      </div>
    </>
  );
}
