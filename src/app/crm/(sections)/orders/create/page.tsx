"use client";
import CreateOrderForm from "@/components/create-order-form";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

export default function CreateOrderPage({}: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-96 space-y-8">
      <div className="flex flex-col space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Create new Order
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          Provide fields to create new Order.
        </p>
      </div>
      <CreateOrderForm
        onCancelClick={() => {
          toast({
            title: "Sample text ",
            description: "Description",
            action: <ToastAction altText="Undo">Undo</ToastAction>,
          });
        }}
        onSuccess={() => {
          router.push("/crm/orders");
        }}
      />
    </div>
  );
}
