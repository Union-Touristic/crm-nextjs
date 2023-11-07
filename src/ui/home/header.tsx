import { LinkLogo } from "@/ui/home/link-logo";
import { MobileMenu } from "@/ui/home/mobile-menu";
import { ProfileDropdown } from "@/ui/profile-dropdown";
import Link from "next/link";
import { auth } from "~/auth";

const navigation = [
  { name: "Дэшборд", href: "/dashboard" },
  { name: "Подборки", href: "/compilations" },
  { name: "Клиенты", href: "/customers" },
  { name: "Документы", href: "/documents" },
];

export async function Header() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  let userImage: string | undefined;

  if (session?.user) {
    userImage = session.user.image?.toString();
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <LinkLogo />
        </div>
        <div className="flex lg:hidden">
          {isLoggedIn && <ProfileDropdown image={userImage} className="mr-4" />}
          <MobileMenu navigation={navigation} isLoggedIn={isLoggedIn} />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <ProfileDropdown image={userImage} />
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Войти <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
