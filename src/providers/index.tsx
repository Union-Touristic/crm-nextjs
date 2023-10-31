"use client";
import * as React from "react";
// import { SessionProvider } from "./session-provider";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    // <SessionProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
    // </SessionProvider>
  );
}
