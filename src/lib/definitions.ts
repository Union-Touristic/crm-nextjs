import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Tour } from "./db/schema";

export type CallbackForm = {
  name: string;
  phone: string;
};

export type NavLinkIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export type NavLink = {
  name: string;
  href: string;
  icon?: NavLinkIcon;
};

export type CompilationStatus = "Active" | "Archived";

export type Pagination = {
  totalPages: number;
  totalItems: number;
  perPage: number;
};

export type CompilationsOverviewPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export type ToursSortConfig = {
  sortKey: Extract<keyof Tour, "departureDate" | "price">;
  direction: "asc" | "dsc";
};

export type Occupancy = {
  adultsCount: number;
  childrenCount: number;
  childAges: number[];
};

export type Breadcrumb = {
  label: string | React.ReactNode;
  href: string;
  active?: boolean;
};
