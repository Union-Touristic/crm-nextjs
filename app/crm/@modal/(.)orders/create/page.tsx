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
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
        {/* TODO: Make Form for creating Orders */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-green-600 focus:ring-green-600 hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
