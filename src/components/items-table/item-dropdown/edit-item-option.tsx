import { editItemAction } from "@/actions/itemActions";
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
import { Spinner } from "@/components/ui/spinner";
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { Pencil } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface Props {
  listPublicId: string;
  title: string;
  itemPublicId: string;
  closeDropdown: () => void;
}

export function EditItemOption({
  listPublicId,
  title,
  itemPublicId,
  closeDropdown,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useDropdownClose({ open, closeDropdown });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      itemTitle: { value: string };
    };
    const newName = target.itemTitle.value;

    if (!newName || isPending) {
      return;
    }

    setIsPending(true);

    try {
      await editItemAction(listPublicId, itemPublicId, newName);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to rename item");
    } finally {
      setIsPending(false);
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
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button disabled={isPending}>
                {isPending && <Spinner />} Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
