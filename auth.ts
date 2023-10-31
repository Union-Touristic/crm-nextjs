import NextAuth from "next-auth";
import { authConfig } from "~/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { users, type User } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { txtCenter } from "@/lib/utils";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(4),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user.password as string
          );
          console.log(txtCenter("passwordMatch"));
          console.log(passwordMatch);
          console.log(txtCenter("user"));
          console.log(user);
          if (passwordMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
