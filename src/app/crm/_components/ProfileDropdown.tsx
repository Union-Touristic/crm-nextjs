import { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarIcon } from "@radix-ui/react-icons";

type UserNavigationLink = {
  name: string;
  href: string;
  callback?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const menuLinks: UserNavigationLink[] = [
  // { name: "Your Profile", href: "#" },
  // { name: "Settings", href: "#" },
  {
    name: "Sign out",
    href: "#",
    callback: (e) => {
      e.preventDefault();
      signOut({ redirect: true, callbackUrl: "/" });
    },
  },
];

export default function ProfileDropdown() {
  const { data, status } = useSession();
  const userName = data?.user?.name;
  const userImage = data?.user?.image;

  if (status === "loading") {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-10 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          {userImage ? (
            <Image
              className="rounded-full"
              height={32}
              width={32}
              src={userImage}
              alt={userName ? `${userName}'s photo` : "No photo"}
            />
          ) : (
            <AvatarIcon
              width={32}
              height={32}
              className="text-gray-700 dark:text-white"
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuLinks.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={cn(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                  onClick={item.callback ? item.callback : () => {}}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
