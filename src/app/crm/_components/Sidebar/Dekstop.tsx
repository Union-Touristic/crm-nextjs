"use client";
import Link from "next/link";
import Image from "next/image";
import NavLinkDesktop from "./NavLink";
import { navigation } from "@/app/crm/_data/navigation";
import { ModeToggle } from "../ModeToggle";

export default function Dekstop() {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-gray-200 dark:bg-gray-800">
        <div className="flex h-16 flex-shrink-0 items-center bg-gray-300 dark:bg-gray-900 px-4">
          <Link href="/">
            <Image height={32} width={38} src="/mark.svg" alt="Your Company" />
          </Link>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              return (
                <NavLinkDesktop
                  viewport="desktop"
                  key={item.name}
                  href={item.href}
                  className="text-gray-900 hover:bg-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  activeClassName="bg-gray-400 dark:bg-gray-900 dark:text-white"
                  icon={{
                    icon: item.icon,
                    className:
                      "dark:text-gray-400 dark:group-hover:text-gray-300",
                    activeClassName: "dark:text-gray-300",
                  }}
                >
                  {item.name}
                </NavLinkDesktop>
              );
            })}
          </nav>
          <div className="px-4 py-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}