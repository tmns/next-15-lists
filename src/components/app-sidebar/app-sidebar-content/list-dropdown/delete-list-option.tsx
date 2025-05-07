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
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { toast } from "sonner";
import { List } from "@/db/types";

interface Props extends Pick<List, "_id"> {
  closeDropdown: () => void;
  lists: List[];
}

export function DeleteListOption({ _id, closeDropdown, lists }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useDropdownClose({ open, closeDropdown });

  const deleteList: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (isPending) {
      return;
    }

    setIsPending(true);

    const listsLength = lists.length;

    try {
      await deleteListAction(_id);
      setOpen(false);

      // If the list that's been deleted is the current list, we need to redirect
      // to the first list in the sidebar or the lists page if it was the only list.
      if (pathname === `/lists/${_id}`) {
        if (listsLength === 1) {
          router.push("/lists");
        } else {
          router.push(`/lists/${lists[0]._id}`);
        }
      }
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
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteList} disabled={isPending}>
              {isPending && <Spinner />} Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
