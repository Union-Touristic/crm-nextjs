import {
  cn,
  getNoun,
  getStyle,
  removeParenthesisAndContentInGivenString,
} from "@/lib/utils";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useTable } from "@/ui/compilation-table/use-table";
import type { Tour } from "@/lib/db/schema";
import {
  TableRowCheckbox,
  TableRowCopyButton,
  TableRowDeleteButton,
  TableRowEditPrice,
} from "@/ui/compilation-table/elements";
import { Td, TdSubText } from "@/ui/compilation-table/table-data-cell";

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
        "flex leading-4 text-xs text-gray-900 bg-white border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-0 focus:relative focus:z-20",
        {
          "bg-gray-100": table.selectedRows.includes(tour.id),
          "bg-gray-400 shadow-lg group is-dragging ring-2 ring-blue-700 ring-offset-0 outline-none":
            snapshot.isDragging || snapshot.isDropAnimating,
        },
        "group/row"
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
      <Td className="flex-row justify-between items-center w-28">
        <div className="flex items-center space-x-2 -ml-1.5">
          <TableRowCopyButton singleTour={tour}>
            <span className="sr-only">Копировать</span>
          </TableRowCopyButton>
          <TableRowDeleteButton tourId={tour.id} className="">
            <span className="sr-only">Удалить</span>
          </TableRowDeleteButton>
        </div>
        <div
          className={cn(
            "px-1 py-1 cursor-grab text-transparent rounded focus:text-gray-400 focus:outline-none focus:ring-blue-500 focus:ring-2 group-hover/row:text-gray-400 transition-colors",
            {
              "text-white focus:text-white": snapshot.isDragging,
            }
          )}
          {...provided.dragHandleProps}
          // provided.dragHandleProps is making row grabbable in particular area
        >
          <Squares2X2Icon className="w-2 h-2" />
          <Squares2X2Icon className="w-2 h-2" />
          <Squares2X2Icon className="w-2 h-2" />
        </div>
      </Td>
    </tr>
  );
}
