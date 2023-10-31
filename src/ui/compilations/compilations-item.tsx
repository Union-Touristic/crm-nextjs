import { cn } from "@/lib/utils";
import { CompilationActions } from "./compilation-actions";
import Link from "next/link";
import type { CompilationStatus } from "@/lib/definitions";
import type { Compilation } from "@/lib/db/schema";

const statuses: Record<CompilationStatus, string> = {
  Active: "text-green-700 bg-green-50 ring-green-600/20",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

type Props = {
  compilation: Compilation;
};

export async function CompilationItem({ compilation }: Props) {
  return (
    <li className="flex items-center justify-between gap-x-6 py-5">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {compilation.id}
          </p>
          <p
            className={cn(
              {
                [statuses.Active]: compilation.isActive,
                [statuses.Archived]: !compilation.isActive,
              },
              "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
            )}
          >
            {compilation.isActive ? "Активно" : "Архив"}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">
            Создано вами{" "}
            <time dateTime={compilation.createdAt?.toISOString()}>
              {compilation.createdAt?.toLocaleDateString()}{" "}
              {compilation.createdAt?.toLocaleTimeString()}
            </time>
          </p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <Link
          href={`/compilations/${compilation.id}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
        >
          Подробнее <span className="sr-only">, ...</span>
        </Link>
        <CompilationActions />
      </div>
    </li>
  );
}
