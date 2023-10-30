import { NavLink } from "@/lib/definitions";

import {
  DrawingPinFilledIcon,
  HomeIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";

export const navigation: NavLink[] = [
  { name: "Dashboard", href: "/crm/dashboard", icon: HomeIcon },
  { name: "Orders", href: "/crm/orders", icon: DrawingPinFilledIcon },
  {
    name: "Compilations",
    href: "/crm/compilations",
    icon: ListBulletIcon,
  },
];
