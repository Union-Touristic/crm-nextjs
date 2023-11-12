import {
  cn,
  createSortConfig,
  frenchFormatter,
  setClipboard,
  tourToText,
  toursArrayToText,
} from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ComponentProps, useEffect, useRef, useState } from "react";

import { updateCompilationTours } from "@/lib/actions";
import { Tour } from "@/lib/db/schema";
import { ToursSortConfig } from "@/lib/definitions";
import { useTable } from "@/ui/compilation-table/use-table";
import { useCompilation } from "@/ui/compilation-table/use-tours";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type TableSortButtonProps = {
  sortKey: ToursSortConfig["sortKey"];
  className?: string;
  children?: React.ReactNode;
};

export function TableSortButton({
  sortKey,
  className,
  children,
}: TableSortButtonProps) {
  const { table, tableAction } = useTable();
  const { compilationAction } = useCompilation();

  const sc = table.sortConfig;

  function handleSortTable(sortKey: TableSortButtonProps["sortKey"]) {
    // TODO: move this logic to tableAction
    const config = createSortConfig(table.sortConfig, sortKey);

    // TODO: maybe I should use useEffect when sortconfig changes

    tableAction({
      type: "set sort config",
      config: config,
    });

    compilationAction({
      type: "sort tours with table sort button",
      sortKey: sortKey,
      tableSortConfig: table.sortConfig,
    });
  }

  const Icon = () => {
    if (sc) {
      if (sc.sortKey === sortKey && sc.direction === "asc") {
        return <ChevronDownIcon className="ml-1 h-4 w-4 text-indigo-700" />;
      } else if (sc.sortKey === sortKey && sc.direction === "dsc") {
        return <ChevronUpIcon className="ml-1 h-4 w-4 text-indigo-700" />;
      }
    }
    return <ChevronUpDownIcon className="ml-1 h-4 w-4 text-gray-500" />;
  };

  return (
    <button
      className={cn(
        "flex rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className,
      )}
      type="button"
      onClick={() => handleSortTable(sortKey)}
    >
      <span>{children}</span>
      <Icon />
    </button>
  );
}

export function TableHeadCheckbox() {
  const { table, tableAction } = useTable();
  const { compilation } = useCompilation();

  const checkbox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isIndeterminate =
      table.selectedRows.length > 0 &&
      table.selectedRows.length < compilation.tours.length;
    tableAction({
      type: "selected rows changed",
      checked: table.selectedRows.length === compilation.tours.length,
      indeterminate: isIndeterminate,
    });
    if (checkbox && checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [table.selectedRows, tableAction, compilation]);

  const handleCheckboxChange = () => {
    tableAction({
      type: "toggle all",
      selectedRows:
        table.checked || table.indeterminate
          ? []
          : compilation.tours.map((tour) => tour.id),
      checked: !table.checked && !table.indeterminate,
      indeterminate: false,
    });
  };

  return (
    <input
      type="checkbox"
      className="absolute top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 hover:cursor-pointer hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 focus:ring-blue-500"
      ref={checkbox}
      checked={table.checked}
      onChange={handleCheckboxChange}
    />
  );
}

type TableRowDeleteButtonProps = {
  tourId: Tour["id"];
  className?: string;
  children?: React.ReactNode;
};

export function TableRowDeleteButton({
  tourId,
  className,
  children,
}: TableRowDeleteButtonProps) {
  const { table, tableAction } = useTable();
  const { compilationAction } = useCompilation();

  function handleDeleteTour() {
    compilationAction({
      type: "tour deleted with table row delete button",
      tourId: tourId,
    });

    tableAction({
      type: "update selected rows",
      selectedRows: table.selectedRows.filter((t) => t !== tourId),
    });
  }

  return (
    <button
      onClick={handleDeleteTour}
      className={cn(
        "rounded p-1.5 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
        className,
      )}
    >
      <TrashIcon
        title="Кнопка удалить"
        className="h-4 w-4"
        aria-hidden="true"
      />
      {children}
    </button>
  );
}

type TableRowCopyButtonProps = {
  singleTour: Tour;
  className?: string;
  children?: React.ReactNode;
};

export function TableRowCopyButton({
  singleTour,
  className,
}: TableRowCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyButtonClick() {
    const text = tourToText(singleTour);
    await setClipboard(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <button
      onClick={handleCopyButtonClick}
      className={cn(
        "rounded p-1.5 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className,
      )}
    >
      {copied ? (
        <ClipboardDocumentCheckIcon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <ClipboardDocumentIcon
          title="Кнопка копировать"
          className="h-4 w-4"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

type TableTopBarDeleteButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TableTopBarDeleteButton({
  className,
  children,
}: TableTopBarDeleteButtonProps) {
  const { table, tableAction } = useTable();
  const { compilationAction } = useCompilation();

  const handleDeleteButtonClick = async () => {
    tableAction({
      type: "update selected rows",
      selectedRows: [],
    });

    compilationAction({
      type: "tours batch deleted with table top bar button",
      tableSelectedRows: table.selectedRows,
    });
  };

  return (
    <button
      onClick={handleDeleteButtonClick}
      className={cn(
        "inline-flex items-center rounded-full border border-red-500 px-2 py-1 text-xs text-red-500 disabled:border-red-200 disabled:text-red-200 sm:px-3",
        className,
      )}
      disabled={!table.selectedRows.length}
    >
      <TrashIcon className="mr-1.5 h-4 w-4" />
      {children}
    </button>
  );
}

type TableTopBarCopyButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TableTopBarCopyButton({
  className,
  children,
}: TableTopBarCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { table } = useTable();
  const { compilation } = useCompilation();

  async function handleCopyButtonClick() {
    const toursToCopy = compilation.tours.filter((tour) =>
      table.selectedRows.includes(tour.id),
    );
    const text = toursArrayToText(toursToCopy);
    await setClipboard(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <button
      onClick={handleCopyButtonClick}
      className={cn(
        "inline-flex items-center rounded-full border border-blue-500 px-2 py-1 text-xs text-blue-500 disabled:border-blue-200 disabled:text-blue-200 sm:px-3",
        className,
      )}
      disabled={!table.selectedRows.length}
    >
      <>
        {copied ? (
          <ClipboardDocumentCheckIcon className="mr-1.5 h-4 w-4" />
        ) : (
          <ClipboardDocumentIcon className="mr-1.5 h-4 w-4" />
        )}
        {children}
      </>
    </button>
  );
}

type TableRowCheckboxProps = {
  singleTour: Tour;
};

export function TableRowCheckbox({ singleTour }: TableRowCheckboxProps) {
  const { table, tableAction } = useTable();

  return (
    <>
      {/* Selected row marker, only show when row is selected. */}
      {table.selectedRows.includes(singleTour.id) && (
        <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600"></div>
      )}
      <input
        type="checkbox"
        className="absolute top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 hover:cursor-pointer hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 focus:ring-blue-500"
        checked={table.selectedRows.includes(singleTour.id)}
        onChange={(e) => {
          tableAction({
            type: "update selected rows",
            selectedRows: e.target.checked
              ? [...table.selectedRows, singleTour.id]
              : table.selectedRows.filter((t) => t !== singleTour.id),
          });
        }}
      />
    </>
  );
}

type TableRowEditPriceProps = {
  tour: Tour;
};

export function TableRowEditPrice({ tour }: TableRowEditPriceProps) {
  const [price, setPrice] = useState(
    frenchFormatter.format(Number(tour.price)),
  );
  const { compilationAction } = useCompilation();
  const { tableAction } = useTable();
  // const { toursStorage, toursStorageAction } = useToursStorage();
  const initialPriceRef = useRef<number>(Number(tour.price));
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[\d\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      const priceToNumber = Number(e.target.value.replace(/\s/g, ""));
      setPrice(frenchFormatter.format(priceToNumber));
    }
  };

  const handleInputKeydown = (e: React.KeyboardEvent) => {
    if (e.code === "Escape") {
      e.preventDefault();

      setPrice(frenchFormatter.format(initialPriceRef.current));
      inputRef.current?.blur();
    }

    if (e.code === "Tab") {
      setPrice(frenchFormatter.format(initialPriceRef.current));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPrice = Number(inputRef.current?.value.replace(/\s/g, ""));

    tableAction({
      type: "set sort config",
      config: null,
    });

    compilationAction({
      type: "tour price changed with table row input",
      tourId: tour.id,
      newPrice: newPrice,
    });

    inputRef.current?.blur();
  };

  return (
    <form className="cursor-pointer" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={price}
        onChange={handlePriceInputChange}
        className="focuse:ring-blue-500 w-16 border-0 bg-transparent p-0 text-right text-xs focus:rounded-sm focus:ring-2 focus:ring-offset-2 group-[.is-dragging]:text-white"
        onKeyDown={handleInputKeydown}
      />
    </form>
  );
}

type ButtonProps = {} & ComponentProps<"button">;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className="ml-2.5 inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium leading-4 text-blue-700 shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:opacity-75 disabled:hover:bg-blue-100"
      {...props}
    >
      {children}
    </button>
  );
}

export function UpdateButton() {
  const { compilation, compilationAction } = useCompilation();

  return (
    <form
      action={async (formData) => {
        const bindedUpdateCompilationTours = updateCompilationTours.bind(null, {
          ...compilation,
        });

        const updated = await bindedUpdateCompilationTours(formData);

        if (updated) {
          compilationAction({ type: "reset metadata" });
        }
      }}
    >
      <SubmitFormButton dataChanged={compilation.touched} />
    </form>
  );
}

function SubmitFormButton({ dataChanged }: { dataChanged: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || !dataChanged} type="submit">
      {pending ? (
        <>
          <Loader2 className="mr-3 h-4 w-4 animate-spin" /> Отправка …
        </>
      ) : (
        "Сохранить"
      )}
    </Button>
  );
}
