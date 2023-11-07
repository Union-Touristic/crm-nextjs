"use client";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const calbackUrl = searchParams.get("callbackUrl");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: calbackUrl || "/dashboard",
    });
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
      <div className="mt-5 flex justify-end">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
