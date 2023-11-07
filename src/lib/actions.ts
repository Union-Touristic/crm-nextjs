"use server";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "~/auth";
import {
  activateCompilationById,
  archiveCompilationById,
  removeCompilationById,
} from "./data";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
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

export async function deleteCompilation(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await new Promise((res) => setTimeout(res, 1000));
    const id = formData.get("id")?.toString();

    if (id) {
      revalidatePath("/dashboard/compilations");
      return await removeCompilationById(id);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function archiveCompilation(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await new Promise((res) => setTimeout(res, 1000));
    const id = formData.get("id")?.toString();

    if (id) {
      revalidatePath("/dashboard/compilations");
      return await archiveCompilationById(id);
    }
  } catch (error) {}
}

export async function activateCompilation(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await new Promise((res) => setTimeout(res, 1000));
    const id = formData.get("id")?.toString();

    if (id) {
      revalidatePath("/dashboard/compilations");
      return await activateCompilationById(id);
    }
  } catch (error) {}
}
