"use client";

import { deleteList } from "@/actions/listActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { List } from "@/db/types";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { MouseEventHandler, useState } from "react";

type Props = Pick<List, "id" | "name">;

export function ListDropdown({ id, name }: Props) {
  const [open, setOpen] = useState(false);

  const [isDeletePending, setIsDeletePending] = useState(false);

  const deleteListAction: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    setIsDeletePending(true);

    try {
      await deleteList(id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletePending(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-lg" align="start">
        <DropdownMenuItem>
          <Pencil className="size-3.5 text-muted-foreground" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteListAction}>
          {isDeletePending ? (
            <Spinner />
          ) : (
            <Trash2 className="size-3.5 text-muted-foreground" />
          )}
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
