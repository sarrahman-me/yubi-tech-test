"use client";
import { isActivePage } from "@/utils/isActivePage";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";

interface navListProps {
  title: string;
  icon: ReactElement;
  href: string;
  allow_permission: boolean;
}

export default function NavList({
  title,
  icon,
  href,
  allow_permission,
}: navListProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = isActivePage(href, pathname);

  return (
    <div
      onClick={() => router.push(href)}
      className={`${
        allow_permission ? "flex" : "hidden"
      } flex items-center space-x-3 p-2 rounded text-secondary-medium/80 cursor-pointer select-none ${
        isActive
          ? "bg-primary-600 border text-white font-medium shadow-sm"
          : "hover:bg-primary-50"
      }`}
    >
      <span
        className={`text-lg ${isActive ? "text-white" : "text-primary-600"}`}
      >
        {icon}
      </span>
      <p className="lg:block hidden">{title}</p>
    </div>
  );
}
