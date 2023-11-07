"use client";
import { Tour } from "@/lib/db/schema";
import { TableProvider } from "@/ui/compilation-table/use-table";
import { ToursProvider } from "@/ui/compilation-table/use-tours";

type Props = {
  compilationTours: Tour[];
  children: React.ReactNode;
};
export function Providers({ compilationTours, children }: Props) {
  return (
    <ToursProvider tours={compilationTours}>
      <TableProvider>{children}</TableProvider>
    </ToursProvider>
  );
}
