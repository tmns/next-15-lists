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
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Trash2 } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { toast } from "sonner";

interface Props extends Pick<List, "publicId"> {
  closeDropdown: () => void;
}

export function DeleteListOption({ publicId, closeDropdown }: Props) {
  const [open, setOpen] = useState(false);
  const [isDeletePending, setIsPending] = useState(false);

  useDropdownClose({ open, closeDropdown });

  const deleteList: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (isDeletePending) {
      return;
    }

    setIsPending(true);

    try {
      await deleteListAction(publicId);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete list");
    } finally {
      setIsPending(false);
    }
  };

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
