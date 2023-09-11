import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderOperations } from "@/components/order-operations";
import { Badge } from "@/components/ui/badge";

type OrderItemProps = {
  order: {
    id: number;
    name: string | null;
    phoneNumber: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
  };
};

export function OrderItem({ order }: OrderItemProps) {
  const { phoneNumber, createdAt } = order;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div className="flex space-x-3">
          <div className="space-x-3">
            <span className="font-semibold">{order.name}</span>
            {phoneNumber && <span className="text-sm">{phoneNumber}</span>}
          </div>
          <Badge variant="outline">Website</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {createdAt && formatDate(createdAt.toDateString())}
          </p>
        </div>
      </div>
      <OrderOperations order={{ id: order.id, name: order.name }} />
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
