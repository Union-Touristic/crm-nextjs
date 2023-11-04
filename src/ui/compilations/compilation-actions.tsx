"use client";
import { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { type Compilation } from "@/lib/db/schema";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/ui/alert-dialog";

import { AlertDialogHeader, AlertDialogFooter } from "../alert-dialog";
import { useFormState, useFormStatus } from "react-dom";
import {
  archiveCompilation,
  deleteCompilation,
  activateCompilation,
} from "@/lib/actions";
import { Loader2, TrashIcon } from "lucide-react";
import { Button } from "../button";

type Props = {
  compilation: Compilation;
};

export function CompilationActions({ compilation }: Props) {
  const [deleteState, deleteAction] = useFormState(
    deleteCompilation,
    undefined
  );
  const [archiveState, archiveAction] = useFormState(
    archiveCompilation,
    undefined
  );

  const [activateState, activateAction] = useFormState(
    activateCompilation,
    undefined
  );

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showTriggerLoading, setShowTriggerLoading] = useState<boolean>(false);

  const isActive = compilation.isActive;

  useEffect(() => {
    setShowTriggerLoading(false);

    return () => {
      setShowDeleteAlert(false);
    };
  }, [deleteState, archiveState, activateState]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={showTriggerLoading}
          className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
        >
          <span className="sr-only">Открыть</span>
          {showTriggerLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isActive ? (
            <DropdownMenuItem
              className="block px-3 py-1 text-sm leading-6 text-gray-900"
              onSelect={() => {
                setShowTriggerLoading(true);
                const formData = new FormData();
                formData.append("id", compilation.id);
                archiveAction(formData);
              }}
            >
              Архивировать
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="block px-3 py-1 text-sm leading-6 text-gray-900"
              onSelect={() => {
                setShowTriggerLoading(true);
                const formData = new FormData();
                formData.append("id", compilation.id);
                activateAction(formData);
              }}
            >
              Активировать
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="block px-3 py-1 text-sm leading-6 text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Уверены что хотите удалить подборку?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя будет отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={compilation.id} />
              <SubmitButton />
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="bg-red-600 focus:ring-red-600 w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <TrashIcon className="mr-2 h-4 w-4" />
      )}
      <span>Удалить</span>
    </Button>
  );
}
