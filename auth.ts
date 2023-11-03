import NextAuth from "next-auth";
import { authConfig } from "~/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { fetchUserByEmail } from "@/lib/data";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await fetchUserByEmail(email);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user.password as string
          );

          if (passwordMatch) return user;
        }

        // Invalid credentials. This will return
        return null;
      },
    }),
  ],
});
