import { Breadcrumb } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export function Breadcrumbs({
  breadcrumbs,
  className,
}: {
  breadcrumbs: Breadcrumb[];
  className?: string;
}) {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Дэшборд</span>
            </Link>
          </div>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={breadcrumb.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={breadcrumb.active ? "page" : undefined}
              >
                {breadcrumb.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
