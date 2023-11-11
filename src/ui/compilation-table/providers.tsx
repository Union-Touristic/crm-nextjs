"use client";
import { ToursWithMetadata } from "@/lib/definitions";
import { TableProvider } from "@/ui/compilation-table/use-table";
import { ToursProvider } from "@/ui/compilation-table/use-tours";

type Props = {
  tours: ToursWithMetadata;
  children: React.ReactNode;
};

export function Providers({ tours, children }: Props) {
  return (
    <ToursProvider tours={tours}>
      <TableProvider>{children}</TableProvider>
    </ToursProvider>
  );
}
