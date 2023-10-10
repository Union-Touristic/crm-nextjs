import { TypograhyH1 } from "@/components/typography/h1";
import { TypographyP } from "@/components/typography/p";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="max-w-lg mx-auto py-10 px-6 bg-white dark:bg-slate-900 rounded-sm">
      <TypograhyH1>Login to CRM</TypograhyH1>
      <TypographyP className="mt-5">
        If you prefer logging in with a password choose below:
      </TypographyP>

      {/* Login to CRM */}
      <LoginForm />
    </div>
  );
}
