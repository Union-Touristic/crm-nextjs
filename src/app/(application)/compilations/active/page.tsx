import { Suspense } from "react";
import {
  CompilationStackedList,
  CompilationStackedListSkeleton,
} from "./../_components/compilations-stacked-list";

export default function Compilations() {
  return (
    <Suspense fallback={<CompilationStackedListSkeleton />}>
      <CompilationStackedList filter="Active" />
    </Suspense>
  );
}
