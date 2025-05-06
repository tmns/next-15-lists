import { EditItemOption } from "@/components/items-table/item-dropdown/edit-item-option";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";

interface Props {
  listPublicId: string;
  itemPublicIds: string[];
  title?: string;
}

export function ItemDropdown({ listPublicId, itemPublicIds, title }: Props) {
  const [open, setOpen] = useState(false);

  const closeDropdown = useCallback(() => setOpen(false), []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Change status</DropdownMenuItem>
        {title && (
          <>
            <DropdownMenuSeparator />
            <EditItemOption
              listPublicId={listPublicId}
              title={title}
              itemPublicId={itemPublicIds[0]}
              closeDropdown={closeDropdown}
            />
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
