import Compilations from "@/app/(application)/compilations/(overview)/page";
import { CompilationsOverviewPageProps } from "@/lib/definitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Архивированные подборки",
};

export default function Page({ searchParams }: CompilationsOverviewPageProps) {
  return <Compilations filter="Archived" searchParams={searchParams} />;
}
