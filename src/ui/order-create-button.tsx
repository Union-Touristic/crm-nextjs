"use client";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useModalDispatch } from "./modal-provider";

interface OrderCreateButtonProps extends ButtonProps {}

export function OrderCreateButton({
  className,
  variant,
  ...props
}: OrderCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modalDispatch = useModalDispatch();

  return (
    <button
      onClick={() => {
        modalDispatch({ type: "open modal" });
        router.push("/crm/orders/create");
      }}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      New order
    </button>
  );
}
