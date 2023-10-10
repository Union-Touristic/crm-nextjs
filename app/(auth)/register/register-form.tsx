"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  return (
    <form className="mt-5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>

      <div className="mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />
      </div>

      <div className="flex justify-end mt-5">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}
