import { NavLink } from "@/types/types";
import {
  RectangleStackIcon,
  UserPlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export const navigation: NavLink[] = [
  { name: "Dashboard", href: "/crm/dashboard", icon: HomeIcon },
  { name: "Selections", href: "/crm/selections", icon: RectangleStackIcon },
  { name: "Leads", href: "/crm/leads", icon: UserPlusIcon },
];