"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <form className="mt-5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" name="email" />
    </form>
  );
}
