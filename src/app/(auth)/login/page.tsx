import { TypograhyH1 } from "@/ui/typography/h1";
import { TypographyP } from "@/ui/typography/p";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-6 bg-white dark:bg-slate-900 rounded-sm">
      <TypograhyH1>Login to CRM</TypograhyH1>
      <TypographyP className="mt-5">
        If you prefer logging in with a password choose below:
      </TypographyP>

      {/* LoginForm to CRM */}
      <LoginForm />
    </div>
  );
}
