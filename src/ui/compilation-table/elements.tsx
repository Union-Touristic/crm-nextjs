import { useEffect, useRef, useState } from "react";
import {
  cn,
  createSortConfig,
  frenchFormatter,
  setClipboard,
  tourToText,
  toursArrayToText,
} from "@/lib/utils";
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { ToursSortConfig } from "@/lib/definitions";
import { useTable } from "@/ui/compilation-table/use-table";
import { useTours } from "@/ui/compilation-table/use-tours";
import { Tour } from "@/lib/db/schema";
import { Loader2 } from "lucide-react";

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
  const { tours, toursAction } = useTours();
  const sc = table.sortConfig;

  function handleSortTable(sortKey: TableSortButtonProps["sortKey"]) {
    const config = createSortConfig(table.sortConfig, sortKey);

    tableAction({
      type: "set sort config",
      config: config,
    });

    const copiedTours = [...tours];

    const sortedTours = copiedTours.sort((a, b) => {
      const key = config.sortKey;
      // TODO: fix possible null
      if (a[key]! < b[key]!) {
        return config.direction === "asc" ? -1 : 1;
      }
      if (a[key]! > b[key]!) {
        return config.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    const updatedTours = sortedTours;

    toursAction({
      type: "update tours",
      tours: updatedTours,
    });
  }

  const Icon = () => {
    if (sc) {
      if (sc.sortKey === sortKey && sc.direction === "asc") {
        return <ChevronDownIcon className="ml-1 w-4 h-4 text-indigo-700" />;
      } else if (sc.sortKey === sortKey && sc.direction === "dsc") {
        return <ChevronUpIcon className="ml-1 w-4 h-4 text-indigo-700" />;
      }
    }
    return <ChevronUpDownIcon className="ml-1 w-4 h-4 text-gray-500" />;
  };

  return (
    <button
      className={cn(
        "flex focus:outline-none focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 rounded-sm",
        className
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
  const { tours } = useTours();

  const checkbox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isIndeterminate =
      table.selectedRows.length > 0 && table.selectedRows.length < tours.length;

    tableAction({
      type: "selected rows changed",
      checked: table.selectedRows.length === tours.length,
      indeterminate: isIndeterminate,
    });

    if (checkbox && checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [table.selectedRows, tableAction, tours]);

  const handleCheckboxChange = () => {
    tableAction({
      type: "toggle all",
      selectedRows:
        table.checked || table.indeterminate
          ? []
          : tours.map((tour) => tour.id),
      checked: !table.checked && !table.indeterminate,
      indeterminate: false,
    });
  };

  return (
    <input
      type="checkbox"
      className="absolute top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 hover:cursor-pointer hover:ring-offset-2 hover:ring-2 hover:ring-blue-300"
      ref={checkbox}
      checked={table.checked}
      onChange={handleCheckboxChange}
    />
  );
}

type TableRowDeleteButton = {
  tourId: Tour["id"];
  className?: string;
  children?: React.ReactNode;
};

export function TableRowDeleteButton({
  tourId,
  className,
  children,
}: TableRowDeleteButton) {
  const { table, tableAction } = useTable();
  const { tours, toursAction } = useTours();

  function handleDeleteTour() {
    toursAction({
      type: "update tours",
      tours: tours.filter((t) => t.id !== tourId),
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
        "rounded p-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:text-red-500",
        className
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
        "rounded p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:text-blue-500",
        className
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
  const { tours, toursAction } = useTours();

  const handleDeleteButtonClick = async () => {
    tableAction({
      type: "update selected rows",
      selectedRows: [],
    });

    toursAction({
      type: "update tours",
      tours: tours.filter((tour) => !table.selectedRows.includes(tour.id)),
    });
  };

  return (
    <button
      onClick={handleDeleteButtonClick}
      className={cn(
        "inline-flex items-center text-xs border px-3 py-1.5 rounded-full text-red-500 border-red-500 disabled:text-red-200 disabled:border-red-200",
        className
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
  const { tours } = useTours();

  async function handleCopyButtonClick() {
    const toursToCopy = tours.filter((tour) =>
      table.selectedRows.includes(tour.id)
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
        "inline-flex items-center text-xs border px-3 py-1.5 rounded-full text-blue-500 border-blue-500 disabled:text-blue-200 disabled:border-blue-200",
        className
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
        className="absolute top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 hover:cursor-pointer hover:ring-blue-300 hover:ring-2 hover:ring-offset-2"
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
  // TODO: fix possible null
  const [price, setPrice] = useState(frenchFormatter.format(tour.price!));
  const { tours, toursAction } = useTours();
  const initialPriceRef = useRef(tour.price);
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
      // TODO: fix types
      setPrice(frenchFormatter.format(initialPriceRef.current!));
      inputRef.current?.blur();
    }

    if (e.code === "Tab") {
      // TODO: fix types
      setPrice(frenchFormatter.format(initialPriceRef.current!));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPrice = Number(inputRef.current?.value.replace(/\s/g, ""));
    const toursWithChangedTour: Tour[] = tours.map((item) =>
      tour.id === item.id
        ? {
            ...item,
            price: updatedPrice,
          }
        : item
    );
    const updatedTours = toursWithChangedTour;

    toursAction({
      type: "update tours",
      tours: updatedTours,
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
        className="p-0 text-xs w-16 text-right border-0 focus:ring-2 focuse:ring-blue-500 focus:rounded-sm focus:ring-offset-2 group-[.is-dragging]:text-white bg-transparent"
        onKeyDown={handleInputKeydown}
      />
    </form>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  disabled: isDisabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      className="inline-flex items-center rounded-md border border-transparent bg-blue-100 ml-2.5 px-3 py-2 text-sm font-medium leading-4 text-blue-700 shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:opacity-75 disabled:hover:bg-blue-100"
    >
      {children}
    </button>
  );
}

export function UpdateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { tours, toursAction } = useTours();

  const handleSaveButtonClick = async () => {
    setIsLoading(true);
  };

  return (
    <Button disabled={isLoading} onClick={handleSaveButtonClick}>
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-3 animate-spin" /> Отправка …
        </>
      ) : (
        "Сохранить"
      )}
    </Button>
  );
}
