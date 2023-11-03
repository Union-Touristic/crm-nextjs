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

export default async function CompilationsActive({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense fallback={<CompilationStackedListSkeleton />}>
        <CompilationStackedList filter="Active" currentPage={currentPage} />
      </Suspense>
    </>
  );
}
