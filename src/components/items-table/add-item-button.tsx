import { createItemAction } from "@/actions/itemActions";
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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

interface Props {
  listPublicId: string;
}

export function AddItemButton({ listPublicId }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      itemTitle: { value: string };
    };
    const itemTitle = target.itemTitle.value;

    if (!itemTitle || isPending) {
      return;
    }

    setIsPending(true);

    try {
      await createItemAction(listPublicId, itemTitle);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create item");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Plus />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Add item</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          // Necessary to prevent tooltip from appearing on close.
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Create item</DialogTitle>
            <DialogDescription>
              Enter a title for your new item and click save
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-y-1.5" onSubmit={handleSubmit}>
            <Label htmlFor="itemTitle">Item title</Label>
            <Input id="itemTitle" name="itemTitle" required />
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
