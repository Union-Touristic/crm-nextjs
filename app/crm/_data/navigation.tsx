import { NavLink } from "@/types/types";

import { DrawingPinFilledIcon, HomeIcon } from "@radix-ui/react-icons";

export const navigation: NavLink[] = [
  { name: "Dashboard", href: "/crm/dashboard", icon: HomeIcon },
  { name: "Orders", href: "/crm/orders", icon: DrawingPinFilledIcon },
];
