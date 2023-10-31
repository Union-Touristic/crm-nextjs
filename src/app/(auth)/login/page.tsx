import { LoginForm } from "@/ui/login-form";

export default async function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}
