"use client";

import React, { createContext, useContext, useReducer } from "react";

type Props = {
  children: React.ReactNode;
};

type ModalState = {
  isOpen: boolean;
};

type ModalAction = { type: "open modal" | "close modal" };

export const ModalContext = createContext<ModalState | null>(null);
export const ModalDispatchContext =
  createContext<React.Dispatch<ModalAction> | null>(null);

const initialState: ModalState = { isOpen: false };

export const ModalProvider = ({ children }: Props) => {
  const [modal, modalDispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={modal}>
      <ModalDispatchContext.Provider value={modalDispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "open modal":
      return { ...state, isOpen: true };
    case "close modal":
      return { ...state, isOpen: false };
    default: {
      throw Error("Unknown action " + action.type);
    }
  }
}

export const useModal = () => {
  const object = useContext(ModalContext);
  if (!object) {
    throw new Error("useModalDispatch must be used within a Provider");
  }
  return object;
};

export const useModalDispatch = () => {
  const object = useContext(ModalDispatchContext);
  if (!object) {
    throw new Error("useModalDispatch must be used within a Provider");
  }
  return object;
};
