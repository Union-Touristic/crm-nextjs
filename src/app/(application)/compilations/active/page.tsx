import { Suspense } from "react";
import {
  CompilationStackedList,
  CompilationStackedListSkeleton,
} from "@/ui/compilations/compilations-stacked-list";

export default function Compilations() {
  return (
    <Suspense fallback={<CompilationStackedListSkeleton />}>
      <CompilationStackedList filter="Active" />
    </Suspense>
  );
}
