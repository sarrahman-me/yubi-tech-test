"use client";
import { bottom_navigation } from "@/data/bottom_navigation";
import { isActivePage } from "@/utils/isActivePage";
import { usePathname, useRouter } from "next/navigation";

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="bg-secondary grid grid-cols-5 p-1 rounded shadow-lg select-none">
      {bottom_navigation.map((item, i) => {
        const isActive = isActivePage(item.href || "", pathname);
        return (
          <div
            key={i}
            onClick={() => router.push(item.href || "")}
            className={`flex flex-col justify-center items-center p-1 rounded ${
              isActive ? "border bg-primary-600 text-white" : "text-primary-600"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <p
              className={`text-xs text-center ${
                isActive ? "text-white" : "text-secondary-medium/50"
              } inline`}
            >
              {item.title}
            </p>
          </div>
        );
      })}
    </aside>
  );
};

export default BottomBar;
