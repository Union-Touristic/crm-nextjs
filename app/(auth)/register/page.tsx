import { TypograhyH1 } from "@/components/typography/h1";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="max-w-lg mx-auto py-10 px-6 bg-white dark:bg-slate-900 rounded-sm">
      <TypograhyH1>Register to CRM</TypograhyH1>

      {/* Register to CRM */}
      <RegisterForm />
    </div>
  );
}
