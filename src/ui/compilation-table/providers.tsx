"use client";
import { CompilationWithToursAndMetadata } from "@/lib/definitions";
import { TableProvider } from "@/ui/compilation-table/use-table";
import { CompilationProvider } from "@/ui/compilation-table/use-tours";

type Props = {
  compilation: CompilationWithToursAndMetadata;
  children: React.ReactNode;
};

export function Providers({ compilation, children }: Props) {
  return (
    <CompilationProvider compilation={compilation}>
      <TableProvider>{children}</TableProvider>
    </CompilationProvider>
  );
}
