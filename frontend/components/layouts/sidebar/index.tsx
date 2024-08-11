/* eslint-disable @next/next/no-img-element */
"use client";
import logo from "@/public/images/logo.png";
import { sidebar_navigation } from "@/data/sidebar_navigation";
import { LogoutButton } from "@/components/spesific";
import { NavList, NavListDropdown } from "@/components/common";
import { useEffect, useState } from "react";
import { GetDataApi } from "@/utils/fetcher";
import { IUser } from "@/interfaces/user";

const Sidebar = () => {
  const [user_permission, setPermission] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/auth/profile");

      const users: IUser = response.data.data;

      const permissions = users.role.list_permissions.map(
        (p) => p.permissions_name
      );

      setPermission(permissions);
    };

    fetchData();
  }, []);

  return (
    <aside className="space-y-10 select-none">
      {/* logo */}
      <span className="flex items-center justify-center space-x-2 text-primary-600">
        <img
          src={logo.src}
          alt="Logo"
          width={30}
          height={30}
          className="bg-primary-600 rounded-full"
        />
        <p className="hidden lg:inline font-semibold text-xl">
          Yubi Technology
        </p>
      </span>

      {/* navigation */}
      <div className="space-y-3">
        {sidebar_navigation.map((item, i) =>
          item.type === "list" ? (
            <NavList
              key={i}
              title={item.title}
              icon={item.icon}
              href={item.href || ""}
              allow_permission={item.permissions.some((permission) =>
                user_permission.includes(permission)
              )}
            />
          ) : (
            <NavListDropdown
              key={i}
              title={item.title}
              user_permission={user_permission}
              icon={item.icon}
              subList={item.subList || []}
              allow_permission={item.permissions.some((permission) =>
                user_permission.includes(permission)
              )}
            />
          )
        )}
        <hr />
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
