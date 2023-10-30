"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

export function CompilationActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open</span>
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="block px-3 py-1 text-sm leading-6 text-gray-900"
          onSelect={() => {}}
        >
          Unarchive
        </DropdownMenuItem>
        <DropdownMenuItem
          className="block px-3 py-1 text-sm leading-6 text-gray-900"
          onSelect={() => {}}
        >
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
