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
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Pencil } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { List } from "@/db/types";
import { useUpdateListMutation } from "@/hooks/mutations/lists";

interface Props extends Pick<List, "_id" | "name"> {
  closeDropdown: () => void;
}

export function EditListOption({ _id, name, closeDropdown }: Props) {
  const [open, setOpen] = useState(false);

  const updateList = useUpdateListMutation();

  useDropdownClose({ open, closeDropdown });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      listName: { value: string };
    };
    const newName = target.listName.value;

    if (!newName) {
      return;
    }

    setOpen(false);

    try {
      await updateList({ id: _id, update: { name: newName } });
    } catch (error) {
      console.error(error);
      toast.error("Failed to rename list");
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
              Enter a new name for your list and click save
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-y-1.5" onSubmit={handleSubmit}>
            <Label htmlFor="listName">List name</Label>
            <Input id="listName" name="listName" required defaultValue={name} />
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
