import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderOperations } from "@/components/order-operations";
import { Badge } from "@/components/ui/badge";
import { type Order } from "@/lib/db/schema";

interface OrderItemProps {
  order: Order;
}

export function OrderItem({ order }: OrderItemProps) {
  const { phoneNumber, source, createdAt } = order;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div className="flex space-x-3">
          <div className="space-x-3">
            <span className="font-semibold">{order.name}</span>
            {phoneNumber && <span className="text-sm">{phoneNumber}</span>}
          </div>
          <Badge variant="outline">{source}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {/* {createdAt && formatDate(createdAt.toDateString())} */}
          </p>
        </div>
      </div>
      <OrderOperations order={order} />
    </div>
  );
}

OrderItem.Skeleton = function OrderItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1 w-full">
        <Skeleton className="h-6 w-2/5" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <Skeleton className="h-8 w-8" />
    </div>
  );
};