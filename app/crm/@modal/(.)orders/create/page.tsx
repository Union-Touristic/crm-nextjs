"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import CreateOrderForm from "@/components/create-order-form";
import { useModal, useModalDispatch } from "@/components/modal-provider";

export default function CreateOrderModal() {
  const modal = useModal();
  const modalDispatch = useModalDispatch();
  const router = useRouter();

  function handleOpenChange(open: boolean) {
    if (open) {
      modalDispatch({ type: "open modal" });
    } else {
      modalDispatch({ type: "close modal" });
    }
    router.back();
  }

  return (
    <AlertDialog open={modal.isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new Order</AlertDialogTitle>
          <AlertDialogDescription>
            Provide fields to create new Order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center">
          <CreateOrderForm
            onCancelClick={() => {
              modalDispatch({ type: "close modal" });
              router.back();
            }}
            onSuccess={() => {
              modalDispatch({ type: "close modal" });
              router.back();
              router.refresh();
            }}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
