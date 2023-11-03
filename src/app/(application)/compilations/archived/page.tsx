import { Suspense } from "react";
import {
  CompilationStackedList,
  CompilationStackedListSkeleton,
} from "@/ui/compilations/compilations-stacked-list";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function CompilationsArchived({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense fallback={<CompilationStackedListSkeleton />}>
        <CompilationStackedList filter="Archived" currentPage={currentPage} />
      </Suspense>
    </>
  );
}
