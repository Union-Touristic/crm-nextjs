"use client";
import {
  RectangleStackIcon,
  UserPlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import MobileSidebar from "./_components/Sidebar/Mobile";
import DekstopSidebar from "./_components/Sidebar/Dekstop";
import TopPanel from "./_components/Sidebar/TopPanel";

const navigation = [
  { name: "Dashboard", href: "/crm/dashboard", icon: HomeIcon },
  { name: "Selections", href: "/crm/selections", icon: RectangleStackIcon },
  { name: "Leads", href: "/crm/leads", icon: UserPlusIcon },
];

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />
      <DekstopSidebar navigation={navigation} />
      <div className="flex flex-col md:pl-64">
        <TopPanel setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </>
  );
}
