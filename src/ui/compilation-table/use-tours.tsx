"use client";
import type { Compilation, Tour } from "@/lib/db/schema";
import { ToursSortConfig, ToursWithMetadata } from "@/lib/definitions";
import { createSortConfig, reorder } from "@/lib/utils";
import { createContext, useContext, useReducer } from "react";
import { DraggableLocation } from "react-beautiful-dnd";
import { TableState } from "./use-table";

export type ToursState = {
  tours: Tour[];
  compilationId: Compilation["id"];
  order: Tour["id"][];
  changedTours: Set<Tour["id"]>;
};

// TODO: maybe rename this to CompilationAction and etc...
export type ToursAction =
  | {
      type: "tour deleted with table row delete button";
      tourId: Tour["id"];
    }
  | {
      type: "tour moved with drag and drop";
      sourceIndex: DraggableLocation["index"];
      destinationIndex: DraggableLocation["index"];
    }
  | {
      type: "tours batch deleted with table top bar button";
      tableSelectedRows: TableState["selectedRows"];
    }
  | {
      type: "sort tours with table sort button";
      sortKey: ToursSortConfig["sortKey"];
      tableSortConfig: TableState["sortConfig"];
    }
  | {
      type: "tour price changed with table row input";
      tourId: Tour["id"];
      newPrice: NonNullable<Tour["price"]>;
    };

export function toursReducer(
  state: ToursState,
  action: ToursAction,
): ToursState {
  switch (action.type) {
    case "tour deleted with table row delete button": {
      const filteredTours = state.tours.filter((t) => t.id !== action.tourId);
      const order = filteredTours.map((tour) => tour.id);
      const newSet = new Set(state.changedTours);
      newSet.delete(action.tourId);

      return {
        ...state,
        order,
        tours: filteredTours,
        changedTours: newSet,
      };
    }

    case "tour moved with drag and drop": {
      const reorderToursIds = reorder(
        state.order,
        action.sourceIndex,
        action.destinationIndex,
      );
      const order = reorderToursIds;

      return {
        ...state,
        order,
      };
    }

    case "tours batch deleted with table top bar button": {
      const filteredTours = state.tours.filter(
        (t) => !action.tableSelectedRows.includes(t.id),
      );
      const order = filteredTours.map((tour) => tour.id);

      return {
        ...state,
        order,
        tours: filteredTours,
      };
    }

    case "sort tours with table sort button": {
      // TODO: what is shell copy?
      const copiedTours = [...state.tours];
      // TODO: handle with names in createSortConfig

      const config = createSortConfig(action.tableSortConfig, action.sortKey);

      const sortedTours = copiedTours.sort((a, b) => {
        const key = config.sortKey;

        const aKey = a[key];
        const bKey = b[key];

        if (!aKey || !bKey) {
          return 0;
        }

        if (aKey < bKey) {
          return config.direction === "asc" ? -1 : 1;
        }

        if (aKey > bKey) {
          return config.direction === "asc" ? 1 : -1;
        }

        return 0;
      });

      const order = sortedTours.map((tour) => tour.id);

      return {
        ...state,
        order,
      };
    }

    case "tour price changed with table row input": {
      const updatedTours = state.tours.map((item) =>
        action.tourId === item.id
          ? {
              ...item,
              price: action.newPrice,
            }
          : item,
      );

      const newSet = new Set(state.changedTours);

      return {
        ...state,
        tours: updatedTours,
        changedTours: newSet.add(action.tourId),
      };
    }

    default:
      throw Error("Unknown action on toursReducer");
  }
}

export const ToursContext = createContext<ToursState | null>(null);
export const ToursDispatchContext =
  createContext<React.Dispatch<ToursAction> | null>(null);

type Props = {
  tours: ToursWithMetadata;
  children: React.ReactNode;
};

export function ToursProvider({ tours, children }: Props) {
  const [toursState, toursDispatch] = useReducer(toursReducer, {
    tours: tours.tours,
    compilationId: tours.id,
    order: tours.toursOrder.sortOrder,
    changedTours: new Set([]),
  });

  return (
    <ToursContext.Provider value={toursState}>
      <ToursDispatchContext.Provider value={toursDispatch}>
        {children}
      </ToursDispatchContext.Provider>
    </ToursContext.Provider>
  );
}

export function useToursState() {
  const object = useContext(ToursContext);

  if (!object) {
    throw new Error("useToursState must be used within a ToursProvider");
  }
  return object;
}

export function useToursDispatch() {
  const object = useContext(ToursDispatchContext);

  if (!object) {
    throw new Error("useToursDispatch must be used within a ToursProvider");
  }
  return object;
}

export function useTours() {
  return { tours: useToursState(), toursAction: useToursDispatch() };
}
