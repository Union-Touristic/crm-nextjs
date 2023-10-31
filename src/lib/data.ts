import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";
import { compilations as compilationsTable } from "@/lib/db/schema";
import type { CompilationStatus } from "@/lib/definitions";
import { desc, eq, sql } from "drizzle-orm";

const COMPILATIONS_PER_PAGE = 5;

export async function fetchFilteredCompilations(
  filter: CompilationStatus | undefined,
  currentPage: number
) {
  noStore();

  const offset = (currentPage - 1) * COMPILATIONS_PER_PAGE;

  try {
    let query = db.select().from(compilationsTable);

    switch (filter) {
      case "Active":
        query = query.where(eq(compilationsTable.isActive, true));
        break;
      case "Archived":
        query = query.where(eq(compilationsTable.isActive, false));
        break;
      default:
        break;
    }
    return await query
      .orderBy(desc(compilationsTable.createdAt))
      .limit(COMPILATIONS_PER_PAGE)
      .offset(offset);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch compilations data.");
  }
}

export async function fetchCompilationsPages(
  filter?: CompilationStatus | undefined
) {
  noStore();

  const countTotal = (count: number) =>
    Math.ceil(Number(count) / COMPILATIONS_PER_PAGE);

  try {
    const query = db
      .select({ count: sql<number>`count(*)` })
      .from(compilationsTable);

    switch (filter) {
      case "Active":
        const [queryActive] = await query.where(
          eq(compilationsTable.isActive, true)
        );
        return countTotal(queryActive.count);
      case "Archived":
        const [queryArchived] = await query.where(
          eq(compilationsTable.isActive, false)
        );
        return countTotal(queryArchived.count);
      default:
        const [queryAll] = await query;
        return countTotal(queryAll.count);
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch compilations pages data.");
  }
}
