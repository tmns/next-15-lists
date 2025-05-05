import { editListAction } from "@/actions/listActions";
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
import { List } from "@/db/types";
import { Pencil } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Props extends Pick<List, "id" | "name"> {
  closeDropdown: () => void;
}

export function EditOption({ id, name, closeDropdown }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const lastOpenRef = useRef(open);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      listName: { value: string };
    };
    const newName = target.listName.value;

    if (!newName || isPending) {
      return;
    }

    setIsPending(true);

    try {
      await editListAction(id, newName);
      setOpen(false);
    } catch (e) {
      console.log(e);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="size-3.5 text-muted-foreground" />
          <span>Edit</span>
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
