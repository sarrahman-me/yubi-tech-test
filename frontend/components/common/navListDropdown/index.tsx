"use client";
import { isActivePage } from "@/utils/isActivePage";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface navListDropdownProps {
  title: string;
  icon: React.ReactElement;
  allow_permission: boolean;
  user_permission: string[];
  subList: {
    title: string;
    icon?: React.ReactElement;
    href: string;
    permissions: string[];
  }[];
}

export default function NavListDropdown({
  title,
  icon,
  subList,
  allow_permission,
  user_permission,
}: navListDropdownProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        title={title}
        className={`${
          allow_permission ? "flex" : "hidden"
        } flex items-center space-x-3 p-2 rounded text-secondary-medium/80 cursor-pointer select-none hover:bg-primary-50`}
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center space-x-2">
          <span className="text-lg text-primary-600">{icon}</span>
          <p className={`lg:block hidden ${open ? "" : ""}`}>{title}</p>
        </span>
        <span className="text-xs lg:block hidden">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {open && (
        <ul className="ml-4 space-y-2 font-light p-2 lg:w-full bg-secondary rounded-md w-full">
          {subList.map((list, i) => {
            const isActive = isActivePage(list.href, pathname);
            return (
              <li
                onClick={() => router.push(list.href)}
                key={i}
                className={`${
                  list.permissions.some((permission) =>
                    user_permission.includes(permission)
                  )
                    ? "flex"
                    : "hidden"
                } flex items-center space-x-3 p-1.5 rounded text-secondary-medium/80 cursor-pointer select-none  ${
                  isActive
                    ? "bg-primary-600 border text-white font-medium shadow-sm"
                    : "hover:bg-primary-50"
                }`}
              >
                {list.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
