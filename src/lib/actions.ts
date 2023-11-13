"use server";
import { CompilationState } from "@/ui/compilation-table/use-tours";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "~/auth";
import {
  activateCompilationById,
  archiveCompilationById,
  deleteTours,
  removeCompilationById,
  updateToursData,
  updateToursOrder,
} from "./data";
import { TourUpdateData } from "./definitions";

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
      revalidatePath("/compilations");
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
      revalidatePath("/compilations");
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
      revalidatePath("/compilations");
      return await activateCompilationById(id);
    }
  } catch (error) {}
}

export async function updateCompilationTours(
  tourState: CompilationState,
  formData: FormData,
) {
  try {
    const { tours, changedTours, deletedTours, order, compilationId } =
      tourState;

    const toursToUpdate: TourUpdateData = [];

    changedTours.forEach((id) => {
      const tour = tours.find((tour) => tour.id === id);
      if (tour) {
        toursToUpdate.push({ id: tour.id, price: tour.price });
      }
    });

    const toursOrderUpdated = updateToursOrder(compilationId, order);
    const toursDeleted = deleteTours(deletedTours);
    const toursDataUpdated = updateToursData(toursToUpdate);

    const result = await Promise.all([
      toursOrderUpdated,
      toursDeleted,
      toursDataUpdated,
    ]);

    revalidatePath(`/compilations/${compilationId}`);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
