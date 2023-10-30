import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Compilation } from "@/lib/db/schema";
import { CompilationOperations } from "@/components/compilation-operations";
import {
  CalendarIcon,
  FileTextIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";

type CompilationItemProps = {
  compilation: Compilation;
};

function dateToStringDate(date: Date, separator: string = "/") {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();

  return d + separator + m + separator + y;
}

function dateToStringTime(date: Date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return hour + ":" + minutes;
}

export function CompilationItem({ compilation }: CompilationItemProps) {
  const { createdAt, isActive } = compilation;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-y-3 w-full">
        <div className="flex justify-between">
          <div className="space-x-3">
            <span className="font-semibold">{compilation.id}</span>
          </div>
          {isActive ? (
            <Badge variant="green">Active</Badge>
          ) : (
            <Badge variant="destructive">Archived</Badge>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <div className="flex items-baseline">
              <FileTextIcon className="w-4" />
              <span className="ml-1">10</span>
            </div>
            <div className="flex items-baseline">
              <SewingPinFilledIcon className="w-4" />
              <span className="ml-1">Astana</span>
            </div>
          </div>
          <div className="flex items-baseline gap-x-2">
            <CalendarIcon className="w-4" />
            {createdAt && (
              <span>
                Created {dateToStringDate(createdAt)} at{" "}
                {dateToStringTime(createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="ml-6">
        <CompilationOperations compilation={compilation} />
      </div>
    </div>
  );
}

CompilationItem.Skeleton = function OrderItemSkeleton() {
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
