import { SessionProvider as NextSessionProvider } from "next-auth/react";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

export function SessionProvider({ children }: Props) {
  return <NextSessionProvider>{children}</NextSessionProvider>;
}
