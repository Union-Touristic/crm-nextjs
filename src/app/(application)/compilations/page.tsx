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

export default async function Compilations({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense fallback={<CompilationStackedListSkeleton />}>
        <CompilationStackedList currentPage={currentPage} />
      </Suspense>
    </>
  );
}
