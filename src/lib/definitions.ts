import { IconProps } from "@radix-ui/react-icons/dist/types";

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
