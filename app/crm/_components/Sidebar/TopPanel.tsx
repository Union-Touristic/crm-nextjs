"use client";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useSidebarDispatch } from "@/app/crm/_context/SidebarContext";
import { Button } from "@/components/ui/button";

export default function TopPanel() {
  const sidebarDispatch = useSidebarDispatch();
  function handleClick() {
    alert("hello world");
  }

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => sidebarDispatch({ type: "open sidebar" })}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">{/* <Search /> */}</div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* <Notifications /> */}
          {/* <ProfileDropdown /> */}
          <Button variant="secondary">Click</Button>
        </div>
      </div>
    </div>
  );
}
