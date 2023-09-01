"use client";
import React, { createContext, useContext, useReducer } from "react";
import sidebarReducer from "./reducer";

type SidebarDispatchContextType = {};

export const SidebarContext = createContext(false);
// TODO: fix type
export const SidebarDispatchContext = createContext<any>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebar, sidebarDispatch] = useReducer(sidebarReducer, false);

  return (
    <SidebarContext.Provider value={sidebar}>
      <SidebarDispatchContext.Provider value={sidebarDispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
export const useSidebarDispatch = () => useContext(SidebarDispatchContext);
