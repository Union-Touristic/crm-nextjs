"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CreateOrderForm from "@/components/create-order-form";

export default function CreateOrderModal() {
  const [_, setShowModal] = useState<boolean>(true);
  const router = useRouter();

  return (
    <AlertDialog
      open
      onOpenChange={(open) => {
        setShowModal(!open);
        router.back();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new Order</AlertDialogTitle>
          <AlertDialogDescription>
            Provide fields to create new Order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <CreateOrderForm
          onCancelClick={() => {
            setShowModal(false);
            router.back();
          }}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
