import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clientOrders } from "@/lib/db/schema";
import { DashboardShell } from "@/ui/shell";
import { DashboardHeader } from "@/ui/header";
import { OrderCreateButton } from "@/ui/order-create-button";
import { OrderItem } from "@/ui/order-item";
import { EmptyPlaceholder } from "@/ui/empty-placeholder";

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
