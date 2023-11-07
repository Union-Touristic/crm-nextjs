import { db } from "@/lib/db";
import { compilations, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { compilationId: string } },
) {
  try {
    const session = await auth();
    const userEmail = session?.user?.email;
    const compilationId = params.compilationId;

    // Check if user has permission to update this compilation
    if (!userEmail) return new NextResponse(null, { status: 401 }); // Unathorized

    const [fetchedCompilation] = await db
      .select()
      .from(compilations)
      .where(eq(compilations.id, compilationId));

    const [fetchedUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, userEmail));

    //  Check if this compilation created by user
    if (fetchedCompilation.userId === fetchedUser.id) {
      await db
        .update(compilations)
        .set({ isActive: !fetchedCompilation.isActive })
        .where(eq(compilations.id, compilationId))
        .returning();

      return new NextResponse(null, { status: 200 }); // Success
    } else {
      return new NextResponse(null, { status: 403 }); // Forbiden
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 }); // Internal Server Error
  }
}
