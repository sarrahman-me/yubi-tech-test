import React from "react";
import { Metadata } from "next";
import { BottomBar, Sidebar } from "@/components/layouts";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <main className="bg-secondary min-h-screen md:p-2">
      {/* sidebar */}
      <div className="p-2 lg:p-5 fixed overflow-y-auto h-screen left-0 bottom-0 md:w-14 lg:w-72 hidden md:block select-none">
        <Sidebar />
      </div>

      {/* main dashboard */}
      <main className="bg-white p-2 lg:p-5 md:border md:rounded min-h-screen ml-0 md:ml-14 lg:ml-72">
        {children}
      </main>

      {/* bottom menu (mobile) */}
      <div className="p-2 bg-white sticky w-full bottom-0 block md:hidden select-none">
        <BottomBar />
      </div>
    </main>
  );
}
