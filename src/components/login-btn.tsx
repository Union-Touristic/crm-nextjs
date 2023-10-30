"use client";
import * as React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export function LoginBtn() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
