"use client";
import { Tour } from "@/lib/db/schema";
import { ToursProvider } from "@/ui/compilation-table/use-tours";
import { TableProvider } from "@/ui/compilation-table/use-table";

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
