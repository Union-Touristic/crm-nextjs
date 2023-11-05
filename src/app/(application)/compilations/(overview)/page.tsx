import { Suspense } from "react";
import {
  CompilationStackedList,
  CompilationStackedListSkeleton,
} from "@/ui/compilations/compilations-stacked-list";
import {
  CompilationsPagination,
  CompilationsPaginationSkeleton,
} from "@/ui/compilations/compilations-pagination";
import {
  CompilationStatus,
  CompilationsOverviewPageProps,
} from "@/lib/definitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Все подборки",
};

type Props = {
  filter?: CompilationStatus;
} & CompilationsOverviewPageProps;

export default async function Compilations({ searchParams, filter }: Props) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense fallback={<CompilationStackedListSkeleton />} key={currentPage}>
        <CompilationStackedList currentPage={currentPage} filter={filter} />
      </Suspense>
      <Suspense fallback={<CompilationsPaginationSkeleton />}>
        <CompilationsPagination filter={filter} />
      </Suspense>
    </>
  );
}
