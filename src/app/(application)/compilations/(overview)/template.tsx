"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { name: "Все", href: "/compilations" },
  { name: "Активные", href: "/compilations/active" },
  { name: "Архив", href: "/compilations/archived" },
];

type Props = {
  children: React.ReactNode;
};

export default function CompilationsTemplate({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:pb-0">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Подборки
        </h3>
        <div className="mt-3 sm:mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Выберите вкладку
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              defaultValue={tabs.find((tab) => tab.href === pathname)?.href}
              onChange={(e) => {
                router.push(e.target.value);
              }}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.href}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cn(
                    tab.href === pathname
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                  )}
                  aria-current={tab.href === pathname ? "page" : undefined}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
