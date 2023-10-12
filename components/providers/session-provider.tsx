import * as React from "react";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export function SessionProvider({ children }: Props) {
  return <NextSessionProvider>{children}</NextSessionProvider>;
}
