import { deleteItemAction } from "@/actions/itemActions";
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
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Trash2 } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { toast } from "sonner";

interface Props {
  closeDropdown: () => void;
  listPublicId: string;
  itemPublicIds: string[];
  onDelete: () => void;
}

export function DeleteItemOption({
  listPublicId,
  itemPublicIds,
  closeDropdown,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useDropdownClose({ open, closeDropdown });

  const deleteItem: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      await deleteItemAction(listPublicId, itemPublicIds);
      setOpen(false);
      onDelete();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item(s)");
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
              This action cannot be undone. This will permanently delete the
              selected item(s) from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteItem} disabled={isPending}>
              {isPending && <Spinner />} Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
