/* eslint-disable @next/next/no-img-element */
"use client";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/images/logo.png";
import { sidebar_navigation } from "@/data/sidebar_navigation";
import { isActivePage } from "@/utils/isActivePage";
import { LogoutButton } from "@/components/spesific";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

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
        {sidebar_navigation.map((item, i) => {
          const isActive = isActivePage(item.href, pathname);
          return (
            <div
              key={i}
              onClick={() => router.push(item.href)}
              className={`flex items-center space-x-3 p-2 rounded text-secondary-medium/80 cursor-pointer select-none ${
                isActive
                  ? "bg-primary-600 border text-white font-medium shadow-sm"
                  : "hover:bg-primary-50"
              }`}
            >
              <span
                className={`text-lg ${
                  isActive ? "text-white" : "text-primary-600"
                }`}
              >
                {item.icon}
              </span>
              <p className="lg:block hidden">{item.title}</p>
            </div>
          );
        })}
        <hr />
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
