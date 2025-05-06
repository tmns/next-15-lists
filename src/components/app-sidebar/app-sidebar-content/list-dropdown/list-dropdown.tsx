"use client";

import { DeleteListOption } from "@/components/app-sidebar/app-sidebar-content/list-dropdown/delete-list-option";
import { EditListOption } from "@/components/app-sidebar/app-sidebar-content/list-dropdown/edit-list-option";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { List } from "@/db/types";
import { MoreHorizontal } from "lucide-react";
import { useCallback, useState } from "react";

type Props = Pick<List, "publicId" | "name"> & {
  lists: List[];
};

export function ListDropdown({ publicId, name, lists }: Props) {
  const [open, setOpen] = useState(false);

  const closeDropdown = useCallback(() => setOpen(false), []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <EditListOption
          publicId={publicId}
          name={name}
          closeDropdown={closeDropdown}
        />
        <DropdownMenuSeparator />
        <DeleteListOption
          publicId={publicId}
          closeDropdown={closeDropdown}
          lists={lists}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
