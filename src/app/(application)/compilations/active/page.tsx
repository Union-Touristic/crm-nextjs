import { Suspense } from "react";
import {
  CompilationStackedList,
  CompilationStackedListSkeleton,
} from "@/ui/compilations/compilations-stacked-list";
import { fetchCompilationsPages } from "@/lib/data";
import { Pagination } from "@/ui/compilations/pagination";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function CompilationsActive({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCompilationsPages("Archived");

  return (
    <>
      <Suspense fallback={<CompilationStackedListSkeleton />}>
        <CompilationStackedList filter="Archived" currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </>
  );
}
