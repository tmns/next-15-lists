import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateItemMutation } from "@/hooks/mutations/items";
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Id } from "convex-utils/dataModel";
import { Pencil } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface Props {
  listId: string;
  title: string;
  itemId: string;
  closeDropdown: () => void;
}

export function EditItemOption({
  listId,
  title,
  itemId,
  closeDropdown,
}: Props) {
  const [open, setOpen] = useState(false);
  const updateItem = useUpdateItemMutation();

  useDropdownClose({ open, closeDropdown });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      itemTitle: { value: string };
    };
    const newTitle = target.itemTitle.value;

    if (!newTitle) {
      return;
    }

    setOpen(false);

    try {
      await updateItem({
        ids: [itemId as Id<"items">],
        listId: listId as Id<"lists">,
        update: { title: newTitle },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to rename item");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="size-3.5 text-muted-foreground" />
          <span>Rename</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit name</DialogTitle>
            <DialogDescription>
              Enter a new title for your item and click save
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-y-1.5" onSubmit={handleSubmit}>
            <Label htmlFor="itemTitle">Item name</Label>
            <Input
              id="itemTitle"
              name="itemTitle"
              required
              defaultValue={title}
            />
            <DialogFooter>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
