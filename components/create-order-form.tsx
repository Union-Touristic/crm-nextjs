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
import { Button } from "./ui/button";

type Props = {
  onCancelClick: () => void;
};

export default function CreateOrderForm({ onCancelClick }: Props) {
  return (
    <form className="flex flex-col justify-self-center space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-end space-x-4">
          <Label htmlFor="order_name">Name</Label>
          <Input
            id="order_name"
            type="text"
            className="w-72"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Label htmlFor="order_phone">Phone</Label>
          <Input
            id="order_phone"
            type="text"
            className="w-72"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Label htmlFor="order_source">Source</Label>
          <Select defaultValue="null">
            <SelectTrigger className="w-72" id="order_source">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">Select an option</SelectItem>
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
