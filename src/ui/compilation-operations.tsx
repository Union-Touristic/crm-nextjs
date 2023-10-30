"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { toast } from "@/ui/use-toast";
import { MoreVertical, Loader2, Archive } from "lucide-react";
import type { Compilation } from "@/lib/db/schema";

type CompilationId = Compilation["id"];

async function archiveCompilation(compilationId: CompilationId) {
  const response = await fetch(`/api/compilations/${compilationId}`, {
    method: "PATCH",
  });

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your compilation was not deleted. Please try again.",
      variant: "destructive",
    });
  }

  return true;
}

async function handleUnarchiveSelect(compilation: Compilation) {
  const response = await fetch(`/api/compilations/${compilation.id}`, {
    method: "PATCH",
  });

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your compilation was not deleted. Please try again.",
      variant: "destructive",
    });
  }

  return true;
}

interface CompilationOperationsProps {
  compilation: Compilation;
}

export function CompilationOperations({
  compilation,
}: CompilationOperationsProps) {
  const router = useRouter();
  const [showArchiveAlert, setShowArchiveAlert] = useState<boolean>(false);
  const [isArchiveLoading, setIsArchiveLoading] = useState<boolean>(false);
  const { isActive } = compilation;

  async function handleArchive(compilation: Compilation) {
    setIsArchiveLoading(true);

    const archived = await archiveCompilation(compilation.id);

    if (archived) {
      setIsArchiveLoading(false);
      setShowArchiveAlert(false);
      router.refresh();
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          {isArchiveLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreVertical className="h-4 w-4" />
          )}
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isActive ? (
            <DropdownMenuItem
              className="flex cursor-pointer items-center text-destructive focus:text-destructive"
              onSelect={() => setShowArchiveAlert(true)}
            >
              Archive
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="flex cursor-pointer items-center text-green-600 focus:text-green-500"
              onSelect={async () => await handleArchive(compilation)}
            >
              Unarchive
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showArchiveAlert} onOpenChange={setShowArchiveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to archive this compilation?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can later restore this compilation from archives.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                await handleArchive(compilation);
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isArchiveLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Archive className="mr-2 h-4 w-4" />
              )}
              <span>Archive</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
