import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";
import { compilations as compilationsTable } from "@/lib/db/schema";
import type { CompilationStatus, Pagination } from "@/lib/definitions";
import { desc, eq, sql, and } from "drizzle-orm";
import { users, type User } from "@/lib/db/schema";
import { auth } from "~/auth";

const COMPILATIONS_PER_PAGE = 5;

export async function fetchUserByEmail(
  email: string
): Promise<User | undefined> {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchFilteredCompilations(
  filter: CompilationStatus | undefined,
  currentPage: number
) {
  noStore();

  const offset = (currentPage - 1) * COMPILATIONS_PER_PAGE;

  try {
    const whereQuery = await whereFilteredCompilationsIsAllOrActiveOrArchived(
      filter
    );

    const query = await db
      .select()
      .from(compilationsTable)
      .where(whereQuery)
      .orderBy(desc(compilationsTable.createdAt))
      .limit(COMPILATIONS_PER_PAGE)
      .offset(offset);

    return query;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch compilations data.");
  }
}

export async function fetchCompilationsPagination(
  filter?: CompilationStatus | undefined
): Promise<Pagination> {
  noStore();

  const whereQuery = await whereFilteredCompilationsIsAllOrActiveOrArchived(
    filter
  );

  const countPages = (count: number) =>
    Math.ceil(Number(count) / COMPILATIONS_PER_PAGE);

  try {
    const [query] = await db
      .select({ count: sql<string>`count(*)` })
      .from(compilationsTable)
      .where(whereQuery);

    return {
      totalPages: countPages(+query.count),
      totalItems: +query.count,
      perPage: COMPILATIONS_PER_PAGE,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch compilations pagination data.");
  }
}

async function whereFilteredCompilationsIsAllOrActiveOrArchived(
  filter: CompilationStatus | undefined
) {
  const user = await getCurrentUser();
  const usersCompilation = eq(compilationsTable.userId, user.id);

  let whereQuery;

  switch (filter) {
    case "Active":
      whereQuery = and(eq(compilationsTable.isActive, true), usersCompilation);
      break;
    case "Archived":
      whereQuery = and(eq(compilationsTable.isActive, false), usersCompilation);
      break;
    default:
      whereQuery = usersCompilation;
      break;
  }

  return whereQuery;
}

async function getCurrentUser() {
  const session = await auth();

  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("Not authenticated");

  const user = await fetchUserByEmail(userEmail);
  if (!user) throw new Error("Never. User does not exists.");

  return user;
}
