import { fetchToursByCompilationId } from "@/lib/data";
import type { Compilation, Tour } from "@/lib/db/schema";
import type { CompilationStatus } from "@/lib/definitions";
import { cn, getNoun } from "@/lib/utils";
import {
  CompilationActionSkeleton,
  CompilationActions,
} from "@/ui/compilations/compilation-actions";
import { Skeleton } from "@/ui/skeleton";
import Link from "next/link";

const statuses: Record<CompilationStatus, string> = {
  Active: "text-green-700 bg-green-50 ring-green-600/20",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

type Props = {
  compilation: Compilation;
};

export async function CompilationsItem({ compilation }: Props) {
  const compilationTours = await fetchToursByCompilationId(compilation.id);

  return (
    <li className="flex items-center justify-between gap-x-6 py-5">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <CompilationsItemTitle
            tours={compilationTours}
            compilation={compilation}
          />
          <CompilationsItemStatus isActive={!!compilation.isActive} />
        </div>
        <CompilationInfo compilation={compilation} tours={compilationTours} />
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <Link
          href={`/compilations/${compilation.id}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
        >
          Подробнее
        </Link>
        <CompilationActions compilation={compilation} />
      </div>
    </li>
  );
}

export function CompilationsItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-x-6 py-5">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <CompilationsItemTitleSkeleton />
          <CompilationsItemStatusSkeleton />
        </div>
        <CompilationInfoSkeleton />
      </div>
      <div className="flex flex-none items-center gap-x-1">
        <Skeleton className="hidden h-8 w-[100px] sm:block" />
        <CompilationActionSkeleton />
      </div>
    </div>
  );
}

function CompilationsItemTitle({
  tours,
  compilation,
}: {
  tours: Tour[];
  compilation: Compilation;
}) {
  // Первый город вылета и первая страна
  const firstTour = tours[0];

  return (
    <p className="text-sm font-semibold leading-6 text-gray-900">
      <Link href={`/compilations/${compilation.id}`}>
        {firstTour.fromCity} &rarr; {firstTour.country}
      </Link>
    </p>
  );
}

export function CompilationsItemTitleSkeleton() {
  return <Skeleton className="h-6 w-28" />;
}

function CompilationsItemStatus({ isActive }: { isActive: boolean }) {
  return (
    <p
      className={cn(
        {
          [statuses.Active]: isActive,
          [statuses.Archived]: !isActive,
        },
        "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
      )}
    >
      {isActive ? "Активно" : "Архив"}
    </p>
  );
}

export function CompilationsItemStatusSkeleton() {
  return <Skeleton className="mt-0.5 h-5 w-12" />;
}
function TextCircle() {
  return (
    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
      <circle cx={1} cy={1} r={1} />
    </svg>
  );
}

function CompilationInfo({
  compilation,
  tours,
}: {
  compilation: Compilation;
  tours: Tour[];
}) {
  const tourNoun = getNoun(tours.length, "тур", "тура", "туров");

  return (
    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
      <p className="truncate">Создано вами</p>
      <TextCircle />
      <p className="whitespace-nowrap">
        <time dateTime={compilation.createdAt?.toISOString()}>
          {compilation.createdAt?.toLocaleDateString("ru")}
          {" в "}
          {compilation.createdAt?.toLocaleTimeString("ru", {
            hour: "numeric",
            minute: "numeric",
          })}
        </time>
      </p>
      <TextCircle />
      <p className="truncate">
        {tours.length} {tourNoun}
      </p>
    </div>
  );
}

export function CompilationInfoSkeleton() {
  return <Skeleton className="mt-1 h-5 w-40 sm:w-52" />;
}
