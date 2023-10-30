import { DashboardHeader } from "@/ui/header";
import { OrderCreateButton } from "@/ui/order-create-button";
import { OrderItem } from "@/ui/order-item";
import { DashboardShell } from "@/ui/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Orders" text="Create and manage orders.">
        <OrderCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <OrderItem.Skeleton />
        <OrderItem.Skeleton />
        <OrderItem.Skeleton />
        <OrderItem.Skeleton />
        <OrderItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
