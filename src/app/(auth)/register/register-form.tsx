"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { FormEvent } from "react";

export function RegisterForm() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>

      <div className="mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />
      </div>

      <div className="mt-5 flex justify-end">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}
