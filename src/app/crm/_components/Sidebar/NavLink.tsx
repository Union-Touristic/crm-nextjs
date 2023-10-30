import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavLinkIcon } from "@/lib/definitions";
import { MouseEventHandler } from "react";

type Props = {
  viewport: "desktop" | "mobile";
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
      className={cn(
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
          className={cn(
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
