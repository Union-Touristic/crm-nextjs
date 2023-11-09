import { db } from "@/lib/db";
import {
  compilations,
  insertTourSchema,
  tours,
  toursOrder,
  users,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { auth } from "~/auth";

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  const session = await auth();
  const authorizedUser = session?.user;

  try {
    if (authorizedUser) {
      const data = await request.json();
      const ToursRequestData = z.array(insertTourSchema);

      const parsedData = ToursRequestData.parse(data);

      const userEmail = authorizedUser.email as string;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, userEmail))
        .limit(1);

      const [createdCompilation] = await db
        .insert(compilations)
        .values({
          userId: user.id,
        })
        .returning();

      const toursToInserst = parsedData.map((tour) => {
        return {
          ...tour,
          compilationId: createdCompilation.id,
        };
      });

      const insertedTours = await db
        .insert(tours)
        .values(toursToInserst)
        .returning({ insertedId: tours.id });

      const toursOrderArr = insertedTours.map((item) => item.insertedId);
      await db.insert(toursOrder).values({
        compilationId: createdCompilation.id,
        sortOrder: toursOrderArr,
      });
    } else {
      return new NextResponse(null, { status: 401 });
    }

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(JSON.stringify(error), { status: 400 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
