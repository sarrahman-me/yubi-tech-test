import { ReactElement } from "react";

export interface IMenuItem {
  type: "dropdown" | "list";
  title: string;
  icon: ReactElement;
  href?: string;
  permissions: string[];
  subList?: {
    title: string;
    icon?: ReactElement;
    href: string;
    permissions: string[];
  }[];
}
