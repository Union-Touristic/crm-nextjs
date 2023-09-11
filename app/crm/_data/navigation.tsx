import { NavLink } from "@/types/types";

import {
  DrawingPinFilledIcon,
  CardStackIcon,
  HomeIcon,
} from "@radix-ui/react-icons";

export const navigation: NavLink[] = [
  { name: "Dashboard", href: "/crm/dashboard", icon: HomeIcon },
  { name: "Selections", href: "/crm/selections", icon: CardStackIcon },
  { name: "Orders", href: "/crm/orders", icon: DrawingPinFilledIcon },
];
