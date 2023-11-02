import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { TourInsert, compilations, tours, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  // TODO: implement logic when createing new compilation
  // const token = await getToken({ req: request });

  try {
    // User has token
    // if (token?.email) {
    //   const email = token.email;

    //   const [user] = await db
    //     .select()
    //     .from(users)
    //     .where(eq(users.email, email))
    //     .limit(1);

    //   const data: TourInsert[] = await request.json();

    //   const [createdCompilation] = await db
    //     .insert(compilations)
    //     .values({
    //       userId: user.id,
    //     })
    //     .returning();

    //   console.log(createdCompilation);

    //   const toursToInserst = data.map((tour) => {
    //     return {
    //       ...tour,
    //       compilationId: createdCompilation.id,
    //     };
    //   });

    //   await db.insert(tours).values(toursToInserst);
    // }

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
