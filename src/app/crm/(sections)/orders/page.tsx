import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clientOrders } from "@/lib/db/schema";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { OrderCreateButton } from "@/components/order-create-button";
import { OrderItem } from "@/components/order-item";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

export const metadata: Metadata = {
  title: "Dashboard",
};

type Props = {};

export default async function DashboardPage({}: Props) {
  const orders = await db
    .select()
    .from(clientOrders)
    .where(eq(clientOrders.isActive, true));

  return (
    <DashboardShell>
      <DashboardHeader heading="Orders" text="Create and manage orders.">
        <OrderCreateButton />
      </DashboardHeader>
      <div>
        {orders?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="file-plus-2" />
            <EmptyPlaceholder.Title>No orders created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any orders yet.
            </EmptyPlaceholder.Description>
            <OrderCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
