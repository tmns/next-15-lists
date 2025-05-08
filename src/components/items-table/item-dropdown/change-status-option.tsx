import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemStatus } from "@/db/types";
import { useDropdownClose } from "@/hooks/use-dropdown-close";
import { useUpdateItemMutation } from "@/hooks/mutations/items";
import { Id } from "convex-utils/dataModel";
import { Label } from "@radix-ui/react-label";
import { CircleDot } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  closeDropdown: () => void;
  listId: string;
  itemIds: string[];
  status: ItemStatus;
}

export function ChangeStatusOption({
  closeDropdown,
  listId,
  itemIds,
  status,
}: Props) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>(status);

  useDropdownClose({ open, closeDropdown });

  const updateItem = useUpdateItemMutation();

  const handleSave = async () => {
    if (
      status === newStatus ||
      !["not_started", "in_progress", "done"].includes(newStatus)
    ) {
      return;
    }

    setOpen(false);

    try {
      await updateItem({
        ids: itemIds as Id<"items">[],
        listId: listId as Id<"lists">,
        update: { status: newStatus as ItemStatus },
      });
      closeDropdown();
    } catch (error) {
      console.error(error);
      toast.error("Failed to change status");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <CircleDot className="size-4" />
          Change status
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change status</DialogTitle>
            <DialogDescription>
              Select a new status for your item
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-1.5">
            <Label>Item status</Label>
            <Select defaultValue={status} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full sm:w-3xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not started</SelectItem>
                <SelectItem value="in_progress">In progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
