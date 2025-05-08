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
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { toast } from "sonner";
import { List } from "@/db/types";
import { useDeleteListMutation } from "@/hooks/mutations/lists";

interface Props extends Pick<List, "_id"> {
  closeDropdown: () => void;
  lists: List[];
}

export function DeleteListOption({ _id, closeDropdown, lists }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const deleteList = useDeleteListMutation();

  useDropdownClose({ open, closeDropdown });

  const handleDeleteList: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    setOpen(false);

    // If the list that's been deleted is the current list, we need to redirect
    // to the first list in the sidebar or the lists page if it was the only list.
    if (pathname === `/lists/${_id}`) {
      if (lists.length === 1) {
        router.push("/lists");
      } else {
        router.push(`/lists/${lists[0]._id}`);
      }
    }

    try {
      await deleteList({ id: _id });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete list");
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteList}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
