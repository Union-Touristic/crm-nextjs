"use client";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import {
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/20/solid";
import classNames from "@/utils/classNames";

const themes = [
  { name: "light", icon: SunIcon },
  { name: "dark", icon: MoonIcon },
  { name: "system", icon: ComputerDesktopIcon },
];

export default function ThemeDropdown() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Menu as="div" className="relative ml-2">
      <div>
        <Menu.Button className="flex items-center rounded-md text-sm focus:outline-none p-2 hover:bg-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="sr-only">Open theme menu</span>
          {resolvedTheme === "light" ? (
            <SunIcon className="flex-shrink h-5 w-5 text-black dark:text-white" />
          ) : (
            <MoonIcon className="flex-shrink h-5 w-5 text-black dark:text-white" />
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
        <Menu.Items className="absolute bottom-10 z-10 origin-bottom-left rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black dark:ring-gray-100 ring-opacity-5 focus:outline-none">
          {themes.map(({ name, icon: Icon }) => (
            <Menu.Item key={name}>
              {({ active, close }) => (
                <button
                  className={classNames(
                    active
                      ? "bg-gray-400 dark:bg-gray-900 dark:text-white"
                      : "",
                    "flex w-full px-2 py-2 text-sm text-gray-900 hover:bg-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  )}
                  onClick={() => {
                    setTheme(name);
                    close();
                  }}
                >
                  <Icon className="flex-shrink-0 h-5 w-5 mr-2.5" />
                  {name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
