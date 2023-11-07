import { TypograhyH1 } from "@/ui/typography/h1";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-lg rounded-sm bg-white px-6 py-10 dark:bg-slate-900">
      <TypograhyH1>Register to CRM</TypograhyH1>

      {/* RegisterForm for CRM */}
      <RegisterForm />
    </div>
  );
}
