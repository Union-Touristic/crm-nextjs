import { Button } from "@/ui/button";
import { Logo } from "@/ui/logo";
import Link from "next/link";
import { ConstrainedMenuButton } from "./constrained-menu-button";

const navigation = [
  {
    href: "/#about",
    name: "О нас",
  },
  {
    href: "/#how-we-work",
    name: "Услуги",
  },
  {
    href: "/#testimonials",
    name: "Отзывы",
  },
  {
    href: "/#contacts",
    name: "Контакты",
  },
];

export function HeaderConstrained() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex text-red-400 lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">ТОО «Union Touristic»</span>
            <Logo textColor="#111827" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <ConstrainedMenuButton navigation={navigation} />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild>
            <a href="tel:+77476766121">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Позвонить
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
