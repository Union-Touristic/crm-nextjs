"use server";
import { signIn, signOut } from "~/auth";

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
