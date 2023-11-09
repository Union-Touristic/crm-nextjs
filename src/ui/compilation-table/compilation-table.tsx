"use client";
import type { Tour } from "@/lib/db/schema";
import { Providers } from "@/ui/compilation-table/providers";
import { Table } from "@/ui/compilation-table/table";

type Props = {
  compilationTours: Tour[];
};

export function CompilationTable({ compilationTours }: Props) {
  return (
    // TODO: Get rid off providers. Move them to upper component
    <Providers compilationTours={compilationTours}>
      <Table />
    </Providers>
  );
}
