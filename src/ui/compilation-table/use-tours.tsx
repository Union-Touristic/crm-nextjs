"use client";
import type { Compilation, Tour } from "@/db/schema";
import {
  CompilationWithToursAndMetadata,
  ToursSortConfig,
} from "@/lib/definitions";
import { createSortConfig, reorder } from "@/lib/utils";
import { TableState } from "@/ui/compilation-table/use-table";
import { createContext, useContext, useReducer } from "react";
import { DraggableLocation } from "react-beautiful-dnd";

export type CompilationState = {
  // we use tours for visual representation.
  tours: Tour[];
  compilationId: Compilation["id"];
  order: Tour["id"][];
  // Metadata
  changedTours: Set<Tour["id"]>;
  deletedTours: Set<Tour["id"]>;
  touched: boolean;
};

// TODO: maybe rename this to CompilationAction and etc...
export type CompilationAction =
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
    }
  | { type: "reset metadata" };

export function compilationReducer(
  state: CompilationState,
  action: CompilationAction,
): CompilationState {
  switch (action.type) {
    case "tour deleted with table row delete button": {
      const filteredTours = state.tours.filter((t) => t.id !== action.tourId);
      const order = filteredTours.map((tour) => tour.id);
      const changedToursSet = new Set(state.changedTours);
      changedToursSet.delete(action.tourId);

      const deletedToursSet = new Set(state.deletedTours);
      deletedToursSet.add(action.tourId);

      return {
        ...state,
        order,
        tours: filteredTours,
        changedTours: changedToursSet,
        deletedTours: deletedToursSet,
        touched: true,
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
        touched: true,
      };
    }

    case "tours batch deleted with table top bar button": {
      const filteredTours = state.tours.filter(
        (t) => !action.tableSelectedRows.includes(t.id),
      );
      const order = filteredTours.map((tour) => tour.id);
      const changedTourSet = new Set(state.changedTours);
      const deletedToursSet = new Set(state.deletedTours);

      action.tableSelectedRows.forEach((item) => {
        changedTourSet.delete(item);
        deletedToursSet.add(item);
      });

      return {
        ...state,
        order,
        tours: filteredTours,
        changedTours: changedTourSet,
        deletedTours: deletedToursSet,
        touched: true,
      };
    }

    case "sort tours with table sort button": {
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
        touched: true,
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
        touched: true,
      };
    }

    case "reset metadata": {
      const changedTourSet = new Set(state.changedTours);
      const deletedToursSet = new Set(state.deletedTours);

      changedTourSet.clear();
      deletedToursSet.clear();

      return {
        ...state,
        changedTours: changedTourSet,
        deletedTours: deletedToursSet,
        touched: false,
      };
    }

    default:
      throw Error("Unknown action on toursReducer");
  }
}

export const CompilationContext = createContext<CompilationState | null>(null);
export const CompilationDispatchContext =
  createContext<React.Dispatch<CompilationAction> | null>(null);

type Props = {
  compilation: CompilationWithToursAndMetadata;
  children: React.ReactNode;
};

export function CompilationProvider({ compilation, children }: Props) {
  const [compilationState, toursDispatch] = useReducer(compilationReducer, {
    tours: compilation.tours,
    compilationId: compilation.id,
    order: compilation.toursOrder.sortOrder,
    changedTours: new Set([]),
    deletedTours: new Set([]),
    touched: false,
  });

  return (
    <CompilationContext.Provider value={compilationState}>
      <CompilationDispatchContext.Provider value={toursDispatch}>
        {children}
      </CompilationDispatchContext.Provider>
    </CompilationContext.Provider>
  );
}

export function useCompilationState() {
  const object = useContext(CompilationContext);

  if (!object) {
    throw new Error("useCompilationState must be used within a ToursProvider");
  }
  return object;
}

export function useCompilationDispatch() {
  const object = useContext(CompilationDispatchContext);

  if (!object) {
    throw new Error(
      "useCompilationDispatch must be used within a ToursProvider",
    );
  }
  return object;
}

export function useCompilation() {
  return {
    compilation: useCompilationState(),
    compilationAction: useCompilationDispatch(),
  };
}
