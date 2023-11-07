import { fetchFilteredCompilations } from "@/lib/data";
import type { CompilationStatus } from "@/lib/definitions";
import { COMPILATIONS_PER_PAGE } from "@/lib/vars";
import {
  CompilationsItem,
  CompilationsItemSkeleton,
} from "@/ui/compilations/compilations-item";

type Props = {
  filter?: CompilationStatus;
  currentPage: number;
};

export async function CompilationStackedList({ filter, currentPage }: Props) {
  const compilations = await fetchFilteredCompilations(filter, currentPage);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {compilations.map((compilation) => (
        <CompilationsItem compilation={compilation} key={compilation.id} />
      ))}
    </ul>
  );
}

export function CompilationStackedListSkeleton() {
  const compilationsSkeletonArray = new Array(COMPILATIONS_PER_PAGE);
  compilationsSkeletonArray.fill(null);

  return (
    <div className="divide-y divide-gray-100">
      {compilationsSkeletonArray.map((value, index) => (
        <CompilationsItemSkeleton key={index} />
      ))}
    </div>
  );
}
