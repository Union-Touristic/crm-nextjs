import Link from "next/link";
import { usePathname } from "next/navigation";

import classNames from "@/utils/classNames";
import { NavLinkIcon } from "@/types/types";
import { MouseEventHandler } from "react";

type Props = {
  viewport: string;
  className: string;
  activeClassName: string;
  href: string;
  icon: {
    icon?: NavLinkIcon;
    className: string;
    activeClassName: string;
  };
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function NavLink({
  viewport,
  className,
  activeClassName,
  href,
  icon: Icon,
  children,
  onClick,
  ...props
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={classNames(
        isActive ? activeClassName : className,
        viewport === "desktop" ? "text-sm" : "text-base",
        "group flex items-center p-2 font-medium rounded-md"
      )}
      href={href}
      onClick={onClick}
      {...props}
    >
      {Icon.icon && (
        <Icon.icon
          className={classNames(
            isActive ? Icon.activeClassName : Icon.className,
            "mr-3 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </Link>
  );
}
