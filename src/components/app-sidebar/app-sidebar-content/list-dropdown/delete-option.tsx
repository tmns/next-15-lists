import { deleteListAction } from "@/actions/listActions";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { List } from "@/db/types";
import { Trash2 } from "lucide-react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

interface Props extends Pick<List, "id"> {
  closeDropdown: () => void;
}

export function DeleteOption({ id, closeDropdown }: Props) {
  const [open, setOpen] = useState(false);
  const lastOpenRef = useRef(open);

  const [isDeletePending, setIsPending] = useState(false);

  const deleteList: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (isDeletePending) {
      return;
    }

    setIsPending(true);

    try {
      await deleteListAction(id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (lastOpenRef.current && !open) {
      closeDropdown();
    }

    lastOpenRef.current = open;
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash2 className="size-3.5 text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              list and its items from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteList} disabled={isDeletePending}>
              {isDeletePending && <Spinner />} Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
