"use client";

import { DeleteOption } from "@/components/app-sidebar/app-sidebar-content/list-dropdown/delete-option";
import { EditOption } from "@/components/app-sidebar/app-sidebar-content/list-dropdown/edit-option";
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

type Props = Pick<List, "publicId" | "name">;

export function ListDropdown({ publicId, name }: Props) {
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
        <EditOption
          publicId={publicId}
          name={name}
          closeDropdown={closeDropdown}
        />
        <DropdownMenuSeparator />
        <DeleteOption publicId={publicId} closeDropdown={closeDropdown} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
