import { Skeleton } from "@/ui/skeleton";
import type { CompilationStatus } from "@/lib/definitions";
import { fetchFilteredCompilations } from "@/lib/data";
import { CompilationItem } from "./compilations-item";

type Props = {
  filter?: CompilationStatus;
  currentPage: number;
};

export async function CompilationStackedList({ filter, currentPage }: Props) {
  const compilations = await fetchFilteredCompilations(filter, currentPage);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {compilations.map((compilation) => (
        <CompilationItem compilation={compilation} key={compilation.id} />
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
