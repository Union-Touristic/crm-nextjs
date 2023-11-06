"use client";
import { TableTopBar } from "@/ui/compilation-table/table-top-bar";
import { Thead } from "@/ui/compilation-table/table-head";
import { useTable } from "@/ui/compilation-table/use-table";
import {
  DragDropContext,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { cn, reorder } from "@/lib/utils";
import { useTours } from "@/ui/compilation-table/use-tours";
import { Tr } from "@/ui/compilation-table/table-row";
import { StrictModeDroppable } from "@/ui/compilation-table/droppable";

type Props = {};

export function Table({}: Props) {
  const { tours, toursAction } = useTours();
  const { table, tableAction } = useTable();

  function handleDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    // dropped at the same place
    if (destination.index === source.index) {
      return;
    }

    tableAction({
      type: "set sort config",
      config: null,
    });

    const reorderedTours = reorder(tours, source.index, destination.index);

    const updatedTours = reorderedTours;

    toursAction({
      type: "update tours",
      tours: updatedTours,
    });
  }

  return (
    <div className="flex flex-col h-full rounded-lg shadow border overflow-hidden">
      <TableTopBar />
      <table className="flex flex-col flex-auto">
        <Thead />
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId="droppable">
            {(provided, snapshot) => (
              <tbody
                className={cn(
                  "relative z-10 py-1 h-[min(400px,500px)] overflow-y-auto transition-colors",
                  snapshot.isDraggingOver ? "bg-gray-100" : "bg-gray-50"
                )}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tours.map((t, index, array) => (
                  <Draggable
                    key={t.id}
                    draggableId={String(t.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Tr snapshot={snapshot} provided={provided} tour={t} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </table>
    </div>
  );
}
