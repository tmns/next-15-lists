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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAddItemMutation } from "@/hooks/mutations/items";
import { Label } from "@radix-ui/react-label";
import { Id } from "convex-utils/dataModel";
import { Plus } from "lucide-react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

interface Props {
  listId: string;
}

export function AddItemButton({ listId }: Props) {
  const [open, setOpen] = useState(false);
  const addItem = useAddItemMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      itemTitle: { value: string };
    };
    const itemTitle = target.itemTitle.value;

    if (!itemTitle) {
      return;
    }

    setOpen(false);

    try {
      await addItem({ title: itemTitle, listId: listId as Id<"lists"> });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create item");
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
