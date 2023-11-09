"use client";
import { TableProvider } from "@/ui/compilation-table/use-table";
import { ToursProvider } from "@/ui/compilation-table/use-tours";

type Props = {
  children: React.ReactNode;
};
export function Providers({ children }: Props) {
  return (
    <ToursProvider>
      <TableProvider>{children}</TableProvider>
    </ToursProvider>
  );
}
