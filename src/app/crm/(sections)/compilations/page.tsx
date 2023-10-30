import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { CompilationItem } from "@/ui/compilation-item";
import { EmptyPlaceholder } from "@/ui/empty-placeholder";
import { DashboardHeader } from "@/ui/header";
import { DashboardShell } from "@/ui/shell";
import { db } from "@/lib/db";
import { compilations, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compilations",
};

export default async function Compilations() {
  const session = await auth();
  const userEmail = session?.user?.email as string;

  const [fetchedUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, userEmail))
    .limit(1);

  const userId = fetchedUser.id;

  const fetchedCompilations = await db
    .select()
    .from(compilations)
    .where(eq(compilations.userId, userId))
    .orderBy(compilations.createdAt);

  return (
    <DashboardShell>
      <DashboardHeader heading="Compilations" text="Manage compilations." />
      <div>
        {fetchedCompilations.length ? (
          <div className="divide-y divide-border rounded-md border">
            {fetchedCompilations.map((compilation) => (
              <CompilationItem key={compilation.id} compilation={compilation} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="file-plus-2" />
            <EmptyPlaceholder.Title>
              No compilations created.
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any compilations yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
