"use client";
import React, { Dispatch, createContext, useContext, useReducer } from "react";
import sidebarReducer, { SidebarAction, SidebarState } from "./reducer";

type Props = {
  children: React.ReactNode;
};

export const SidebarContext = createContext<SidebarState | null>(null);
export const SidebarDispatchContext =
  createContext<Dispatch<SidebarAction> | null>(null);

const initialState: SidebarState = { isOpen: false };

export const SidebarProvider = ({ children }: Props) => {
  const [sidebar, sidebarDispatch] = useReducer(sidebarReducer, initialState);

  return (
    <SidebarContext.Provider value={sidebar}>
      <SidebarDispatchContext.Provider value={sidebarDispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const object = useContext(SidebarContext);
  if (!object) {
    throw new Error("useSidebarDispatch must be used within a Provider");
  }
  return object;
};

export const useSidebarDispatch = () => {
  const object = useContext(SidebarDispatchContext);
  if (!object) {
    throw new Error("useSidebarDispatch must be used within a Provider");
  }
  return object;
};
