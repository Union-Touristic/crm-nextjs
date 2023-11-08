import { db } from "@/lib/db";
import { TourInsert, compilations, tours, users } from "@/lib/db/schema";
import { txtCenter } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/auth";

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  const session = await auth();
  const authorizedUser = session?.user;

  try {
    if (authorizedUser) {
      // validate tours
      const data: TourInsert[] = await request.json();
      const toursToInserst = data.map((tour) => {
        return {
          ...tour,
          compilationId: createdCompilation.id,
        };
      });

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

      await db.insert(tours).values(toursToInserst);
    } else {
      return new NextResponse(null, { status: 401 });
    }

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.log(txtCenter("Error on creating compilation"));
    console.log(error);
  }
}
