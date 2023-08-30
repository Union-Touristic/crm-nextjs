import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type CallbackForm = {
  name: string;
  phone: string;
};

export type NavLinkIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>
>;

export type NavLink = {
  name: string;
  href: string;
  icon?: NavLinkIcon;
};
