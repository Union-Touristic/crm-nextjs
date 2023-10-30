import { cn } from "@/lib/utils";
import { CompilationActions } from "./compilation-actions";
import Link from "next/link";
import { Skeleton } from "@/ui/skeleton";
import type { Compilation, CompilationStatus } from "@/types/compilations";
import { compilations as data } from "@/data/compilations";

function fetchCompilations(
  filter: CompilationStatus | undefined
): Promise<Compilation[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filter) resolve(data.filter((item) => item.status === filter));
      resolve(data);
    }, 1500);
  });
}

const statuses: Record<CompilationStatus, string> = {
  Active: "text-green-700 bg-green-50 ring-green-600/20",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

type Props = {
  filter?: CompilationStatus;
};

export async function CompilationStackedList({ filter }: Props) {
  const compilations = await fetchCompilations(filter);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {compilations.map((compilation) => (
        <li
          key={compilation.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {compilation.name}
              </p>
              <p
                className={cn(
                  statuses[compilation.status],
                  "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {compilation.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Due on{" "}
                <time dateTime={compilation.dueDateTime}>
                  {compilation.dueDate}
                </time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Created by {compilation.createdBy}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <Link
              href={compilation.href}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View <span className="sr-only">, {compilation.name}</span>
            </Link>
            <CompilationActions />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CompilationStackedListSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-[48px] mt-5 mb-10 rounded-lg" />
      <Skeleton className="w-full h-[48px] mt-5 mb-10 rounded-lg" />
      <Skeleton className="w-full h-[48px] mt-5 mb-10 rounded-lg" />
      <Skeleton className="w-full h-[48px] mt-5 mb-10 rounded-lg" />
      <Skeleton className="w-full h-[48px] mt-5 mb-10 rounded-lg" />
    </>
  );
}
