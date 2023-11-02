import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/ui/logo";
import { Navigation } from "@/ui/application/navigation";
import { AvatarPlaceholder } from "@/ui/avatar-placeholder";
import { User } from "next-auth";

type Props = {
  user: Omit<User, "id">;
};

export default function Sidebar({ user }: Props) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
        <div className="flex shrink-0 items-center py-3">
          <Link href="/dashboard">
            <Logo />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <Navigation />
            </li>
            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
              >
                {user.image ? (
                  <Image
                    className="rounded-full"
                    src="/profile-photo.avif"
                    height={32}
                    width={32}
                    alt="Фотография профиля"
                  />
                ) : (
                  <AvatarPlaceholder size="lg" />
                )}
                <span className="sr-only">Ваш профиль</span>
                <span aria-hidden="true">
                  {user.name ? user.name : "Ваш профиль"}
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
