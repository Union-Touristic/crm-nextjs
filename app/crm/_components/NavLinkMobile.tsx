"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classNames from "@/utils/classNames";

export default function NavLink({
  className,
  activeClassName,
  href,
  children,
  ...props
}: {
  className: string;
  activeClassName: string;
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={classNames(
        isActive ? activeClassName : className,
        "group flex items-center p-2 text-base font-medium rounded-md"
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
