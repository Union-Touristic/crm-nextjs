"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const signInResponse = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/crm/dashboard",
    });

    console.log(signInResponse);
  }

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />
      </div>
      <div className="flex justify-end mt-5">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
