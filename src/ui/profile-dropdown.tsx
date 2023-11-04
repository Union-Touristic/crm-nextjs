"use client";
import { ComponentProps, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AvatarPlaceholder } from "@/ui/avatar-placeholder";
import Link from "next/link";
import { logOut } from "@/lib/actions";

type Props = {
  image?: string;
  avatarSize?: Parameters<typeof AvatarPlaceholder>[0]["size"];
} & ComponentProps<typeof Menu>;

export function ProfileDropdown({ image, className, avatarSize }: Props) {
  return (
    <Menu as="div" className={cn("relative", className)}>
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Открыть меню пользователя</span>
          {image ? (
            <Image
              className="rounded-full"
              src="/profile-photo.avif"
              height={32}
              width={32}
              alt="Фотография профиля"
            />
          ) : (
            <AvatarPlaceholder size={avatarSize} />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={cn(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Ваш профиль
              </a>
            )}
          </Menu.Item> */}
          {/* <Menu.Item>
            {({ active }) => (
              <Link
                href="#"
                className={cn(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Настройки
              </Link>
            )}
          </Menu.Item> */}
          <Menu.Item>
            {({ active }) => (
              <form
                action={logOut}
                className={cn(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                <button className="w-full text-left">Выйти</button>
              </form>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
