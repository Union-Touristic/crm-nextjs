import type { Tour } from "@/lib/db/schema";
import {
  cn,
  getNoun,
  getStyle,
  removeParenthesisAndContentInGivenString,
} from "@/lib/utils";
import {
  TableRowCheckbox,
  TableRowCopyButton,
  TableRowDeleteButton,
  TableRowEditPrice,
} from "@/ui/compilation-table/elements";
import { Td, TdSubText } from "@/ui/compilation-table/table-data-cell";
import { useTable } from "@/ui/compilation-table/use-table";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

type Props = {
  tour: Tour;
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
};

export function Tr({ tour, provided, snapshot }: Props) {
  const { table } = useTable();

  return (
    <tr
      className={cn(
        "flex border-b border-gray-200 bg-white text-xs leading-4 text-gray-900 focus:relative focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-0",
        {
          "bg-gray-100": table.selectedRows.includes(tour.id),
          "is-dragging group bg-gray-400 shadow-lg outline-none ring-2 ring-blue-700 ring-offset-0":
            snapshot.isDragging || snapshot.isDropAnimating,
        },
        "group/row",
      )}
      {...provided.draggableProps}
      style={getStyle(provided.draggableProps.style, snapshot)}
      ref={provided.innerRef}
    >
      <Td className="relative w-9">
        <TableRowCheckbox singleTour={tour} />
      </Td>
      <Td className="flex-1">
        <span className="font-medium">
          {tour.hotel && removeParenthesisAndContentInGivenString(tour.hotel)}
        </span>
        <TdSubText>
          {tour.country}, {tour.region}
        </TdSubText>
      </Td>
      <Td className="w-24">
        <span>{tour.fromCity}</span>
        <TdSubText>{tour.operator}</TdSubText>
      </Td>
      <Td className="w-28">
        <span>{tour.departureDate}</span>
        <TdSubText>
          {tour.nights} {getNoun(Number(tour.nights), "ночь", "ночи", "ночей")}
        </TdSubText>
      </Td>
      <Td className="w-36">
        <span>{tour.boardBasis}</span>
        <TdSubText>{tour.roomType}</TdSubText>
      </Td>
      <Td className="w-20 text-right">
        <TableRowEditPrice tour={tour} />
        <TdSubText>{tour.currency}</TdSubText>
      </Td>
      <Td className="w-28 flex-row items-center justify-between">
        <div className="-ml-1.5 flex items-center space-x-2">
          <TableRowCopyButton singleTour={tour}>
            <span className="sr-only">Копировать</span>
          </TableRowCopyButton>
          <TableRowDeleteButton tourId={tour.id} className="">
            <span className="sr-only">Удалить</span>
          </TableRowDeleteButton>
        </div>
        <div
          className={cn(
            "cursor-grab rounded px-1 py-1 text-transparent transition-colors focus:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 group-hover/row:text-gray-400",
            {
              "text-white focus:text-white": snapshot.isDragging,
            },
          )}
          {...provided.dragHandleProps}
          // provided.dragHandleProps is making row grabbable in particular area
        >
          <Squares2X2Icon className="h-2 w-2" />
          <Squares2X2Icon className="h-2 w-2" />
          <Squares2X2Icon className="h-2 w-2" />
        </div>
      </Td>
    </tr>
  );
}
