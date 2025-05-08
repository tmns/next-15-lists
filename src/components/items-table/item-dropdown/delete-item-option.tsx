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
import { useDeleteItemMutation } from "@/hooks/mutations/items";
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Id } from "convex-utils/dataModel";
import { Trash2 } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { toast } from "sonner";

interface Props {
  closeDropdown: () => void;
  listId: Id<"lists">;
  itemIds: string[];
  onDelete: () => void;
}

export function DeleteItemOption({
  listId,
  itemIds,
  closeDropdown,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const deleteItem = useDeleteItemMutation();

  useDropdownClose({ open, closeDropdown });

  const handleDeleteItem: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    setOpen(false);

    try {
      await deleteItem({ ids: itemIds as Id<"items">[], listId });
      onDelete();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item(s)");
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem}>
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
