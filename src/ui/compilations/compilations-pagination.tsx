import { fetchCompilationsPagination } from "@/lib/data";
import type { CompilationStatus } from "@/lib/definitions";
import { Pagination, PaginationSkeleton } from "@/ui/pagination";

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
