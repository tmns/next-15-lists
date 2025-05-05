"use client";

import { createListAction } from "@/actions/listActions";
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
import { Label } from "@/components/ui/label";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function AddListButton() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const target = e.target as typeof e.target & {
      listName: { value: string };
    };
    const name = target.listName.value;

    if (!name || isPending) {
      return;
    }

    try {
      const publicId = await createListAction(name);
      setOpen(false);
      router.push(`/lists/${publicId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create list");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction>
          <Plus /> <span className="sr-only">Add List</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create list</DialogTitle>
            <DialogDescription>
              Enter a name for your new list and click save
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-y-1.5" onSubmit={handleSubmit}>
            <Label htmlFor="listName">List name</Label>
            <Input id="listName" name="listName" required />
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
