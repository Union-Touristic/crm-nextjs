"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import Icon from "@/components/lucide-icon";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderCreateButtonProps extends ButtonProps {}

export function OrderCreateButton({
  className,
  variant,
  ...props
}: OrderCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <button
      onClick={() => {}}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon name="loader-2" className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon name="plus" className="mr-2 h-4 w-4" />
      )}
      New order
    </button>
  );
}
