"use client";
import { authenticate } from "@/lib/actions";
import { Logo } from "@/ui/logo";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

export function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl")?.toString();

  return (
    <div className="w-full max-w-sm space-y-10">
      <div>
        <Link href="/">
          <Logo />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Войти в аккаунт
        </h2>
      </div>
      <form action={action} className="space-y-6">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="relative -space-y-px rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
          <div>
            <label htmlFor="email-address" className="sr-only">
              Адрес электронной почты
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              defaultValue="foo@test.com"
              autoComplete="email"
              required
              className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Электронная почта"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue="123456"
              autoComplete="current-password"
              required
              className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Пароль"
            />
          </div>
        </div>
        {code === "CredentialSignin" && (
          <div className="flex items-center">
            <ExclamationCircleIcon className="mr-2 h-5 w-5 text-red-500" />
            <p aria-live="polite" className="text-sm text-red-500">
              Неверные данные
            </p>
          </div>
        )}

        {/* <div className="flex items-center justify-end">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm leading-6 text-gray-900"
            >
              Запомнить меня
            </label>
          </div>

          <div className="text-sm leading-6">
            <Link
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Забыли пароль?
            </Link>
          </div>
        </div> */}
        <div>
          <LoginButton />
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      aria-disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Войти
    </button>
  );
}
