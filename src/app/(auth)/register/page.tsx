import { TypograhyH1 } from "@/components/typography/h1";
import { RegisterForm } from "./register-form";
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-6 bg-white dark:bg-slate-900 rounded-sm">
      <TypograhyH1>Register to CRM</TypograhyH1>

      {/* RegisterForm for CRM */}
      <RegisterForm />
    </div>
  );
}
