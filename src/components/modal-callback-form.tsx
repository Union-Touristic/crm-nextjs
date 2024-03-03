"use client";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { useState } from "react";
import { CallbackForm } from "./callback-form";

type Props = {
  dialogTrigger?: React.ReactNode;
};

export function CallbackFormModal({ dialogTrigger }: Props) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        {dialogTrigger ? dialogTrigger : <Button>Заявка</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Заявка на подбор тура</DialogTitle>
        </DialogHeader>
        <CallbackForm
          className="mt-5 p-2"
          submitButtonPosition="end"
          onSuccessAlertOk={() => {
            setShowDialog(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
