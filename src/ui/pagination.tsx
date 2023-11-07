"use client";

import { cn, generatePagination } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Pagination } from "@/lib/definitions";
import { Skeleton } from "@/ui/skeleton";

type PaginationRowProps = {
  pagination: Pagination;
  currentPage: number;
};

type PaginationNavProps = {
  searchParams: ReturnType<typeof useSearchParams>;
} & PaginationRowProps;

type Props = {
  pagination: Pagination;
};

export function Pagination({ pagination }: Props) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <PaginationNavMobile
        pagination={pagination}
        currentPage={currentPage}
        searchParams={searchParams}
      />
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <PaginationDescription
            pagination={pagination}
            currentPage={currentPage}
          />
        </div>
        <div>
          <PaginationNav
            pagination={pagination}
            currentPage={currentPage}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <PaginationNavMobileSkeleton />
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <PaginationDescriptionSkeleton />
        <PaginationNavSkeleton />
      </div>
    </div>
  );
}

function PaginationNavMobile({
  pagination,
  currentPage,
  searchParams,
}: PaginationNavProps) {
  const createPageURL = useCreatePageUrl(searchParams);

  if (pagination.totalItems === 0) {
    return (
      <div className="sm:hidden">
        <PaginationDescription
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-between sm:hidden">
      {currentPage <= 1 ? (
        <div />
      ) : (
        <Link
          href={createPageURL(currentPage - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Предыдущие
        </Link>
      )}

      {currentPage >= pagination.totalPages ? (
        <div />
      ) : (
        <Link
          href={createPageURL(currentPage + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Следующие
        </Link>
      )}
    </div>
  );
}

function PaginationNavMobileSkeleton() {
  return (
    <div className="flex flex-1 justify-between sm:hidden">
      <Skeleton className="h-[38px] w-36" />
      <Skeleton className="h-[38px] w-36" />
    </div>
  );
}

function useCreatePageUrl(searchParams: ReturnType<typeof useSearchParams>) {
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return createPageURL;
}

function PaginationNav({
  pagination,
  currentPage,
  searchParams,
}: PaginationNavProps) {
  const createPageURL = useCreatePageUrl(searchParams);
  const allPages = generatePagination(currentPage, pagination.totalPages);

  if (pagination.totalItems === 0 || pagination.totalPages <= 1) return null;

  return (
    <nav
      className="isolate inline-flex rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      {allPages.map((page, index) => {
        let position: "first" | "last" | "single" | "middle" | undefined;

        if (index === 0) position = "first";
        if (index === allPages.length - 1) position = "last";
        if (allPages.length === 1) position = "single";
        if (page === "...") position = "middle";
        return (
          <PaginationNumber
            key={page}
            href={createPageURL(page)}
            page={page}
            position={position}
            isActive={currentPage === page}
          />
        );
      })}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= pagination.totalPages}
      />
    </nav>
  );
}

function PaginationNavSkeleton() {
  return <Skeleton className="h-10 w-44" />;
}

function PaginationDescription({
  pagination,
  currentPage,
}: PaginationRowProps) {
  const pageFrom = () => {
    if (currentPage === 1) return 1;
    return currentPage * pagination.perPage - pagination.perPage + 1;
  };

  const pageTo = () => {
    const untill = currentPage * pagination.perPage;
    if (untill > pagination.totalItems) return pagination.totalItems;
    return untill;
  };

  if (pagination.totalItems === 0) {
    return (
      <p className="text-sm text-gray-700">
        Найдено <span className="font-medium">0</span> результатов
      </p>
    );
  }

  return (
    <p className="text-sm text-gray-700">
      Показывается с <span className="font-medium">{pageFrom()} </span> по{" "}
      <span className="font-medium">{pageTo()}</span> из{" "}
      <span className="font-medium">{pagination.totalItems}</span> результатов
    </p>
  );
}

function PaginationDescriptionSkeleton() {
  return <Skeleton className="h-5 w-64" />;
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = cn(
    "relative inline-flex h-10 w-10 items-center justify-center text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 hover:bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600":
        isActive,
      "hover:bg-blue-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = cn(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    ) : (
      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
