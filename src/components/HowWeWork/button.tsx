"use client";
import { scrollToSection } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export function Button({ children }: Props) {
  return (
    <a
      href="#callback"
      className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      onClick={scrollToSection}
    >
      {children}
    </a>
  );
}
