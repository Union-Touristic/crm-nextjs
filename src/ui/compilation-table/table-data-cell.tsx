import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Td({ className, children, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "flex flex-col p-2 group-[.is-dragging]:text-white first:pl-3 last:pr-3",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

export function TdSubText({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-gray-500 group-[.is-dragging]:text-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
