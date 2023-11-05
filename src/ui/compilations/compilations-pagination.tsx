import { fetchCompilationsPagination } from "@/lib/data";
import { Pagination, PaginationSkeleton } from "@/ui/pagination";
import type { CompilationStatus } from "@/lib/definitions";

type Props = {
  filter?: CompilationStatus;
};

export async function CompilationsPagination({ filter }: Props) {
  const pagination = await fetchCompilationsPagination(filter);

  return <Pagination pagination={pagination} />;
}

export function CompilationsPaginationSkeleton() {
  return <PaginationSkeleton />;
}
