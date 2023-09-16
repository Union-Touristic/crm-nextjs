"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type Props = {
  onCancelClick?: (e: React.MouseEvent) => void;
  onSuccess?: () => void;
  onFail?: () => void;
};

type FormState = {
  order_name: string;
  order_phone: string;
  order_source: string;
};

export type Order = FormState;

const initialForm: FormState = {
  order_name: "",
  order_phone: "",
  order_source: "unknown",
};

async function createOrder(order: Order) {
  const response = await fetch(`/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your Order was not created. Please try again.",
      variant: "destructive",
    });
    return false;
  }

  return true;
}

export default function CreateOrderForm({
  onCancelClick = () => {},
  onSuccess = () => {},
  onFail = () => {},
}: Props) {
  const [form, setForm] = useState<FormState>(initialForm);

  async function handleSumbmit(e: React.FormEvent) {
    e.preventDefault();
    const created = await createOrder(form);

    if (created) {
      onSuccess();
    } else {
      onFail();
    }
  }

  return (
    <form className="inline-flex flex-col space-y-8" onSubmit={handleSumbmit}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-end space-x-4">
          <Label htmlFor="order_name">Name</Label>
          <Input
            id="order_name"
            name="order_name"
            type="text"
            className="w-72"
            autoComplete="off"
            onChange={(e) => {
              setForm((prevForm) => ({
                ...prevForm,
                order_name: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Label htmlFor="order_phone">Phone</Label>
          <Input
            id="order_phone"
            type="number"
            className="w-72"
            autoComplete="off"
            onChange={(e) => {
              setForm((prevForm) => ({
                ...prevForm,
                order_phone: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Label htmlFor="order_source">Source</Label>
          <Select
            defaultValue="unknown"
            onValueChange={(value) => {
              setForm((prevForm) => ({
                ...prevForm,
                order_source: value,
              }));
            }}
          >
            <SelectTrigger className="w-72" id="order_source">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unknown">Select an option</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="advertisement">Advertisement</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="reset" variant="outline" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="bg-green-700 hover:bg-green-600 text-white"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
