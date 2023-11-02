"use server";
import { signIn, signOut } from "~/auth";
import { users, type User } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await new Promise((res) => setTimeout(res, 1000));
    const callbackUrl = formData.get("callbackUrl");

    await signIn("credentials", {
      redirectTo: !!callbackUrl ? callbackUrl.toString() : "/dashboard",
      ...Object.fromEntries(formData),
    });
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

export async function logOut(formData: FormData) {
  await signOut();
}
