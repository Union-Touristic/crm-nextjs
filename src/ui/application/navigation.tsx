"use client";
import { cn } from "@/lib/utils";
import {
  DocumentDuplicateIcon,
  HomeIcon,
  RectangleStackIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Дэшборд", href: "/dashboard", icon: HomeIcon },

  { name: "Подборки", href: "/compilations", icon: RectangleStackIcon },
  { name: "Клиенты", href: "/customers", icon: UserGroupIcon },
  {
    name: "Документы",
    href: "/documents",
    icon: DocumentDuplicateIcon,
  },
];

type Props = {
  closeSidebar?: () => void;
};

export function Navigation({ closeSidebar }: Props) {
  const pathname = usePathname();

  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={cn(
              pathname.includes(item.href)
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            )}
            onClick={() => {
              closeSidebar && closeSidebar();
            }}
          >
            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
