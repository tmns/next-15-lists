import { ChangeStatusOption } from "@/components/items-table/item-dropdown/change-status-option";
import { DeleteItemOption } from "@/components/items-table/item-dropdown/delete-item-option";
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
import { ItemStatus } from "@/db/types";
import { MoreHorizontal, CircleDot } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";

interface Props {
  listPublicId: string;
  itemPublicIds: string[];
  title?: string;
  status: ItemStatus;
  onDelete: () => void;
}

export function ItemDropdown({
  listPublicId,
  itemPublicIds,
  title,
  status,
  onDelete,
}: Props) {
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
        <ChangeStatusOption
          listPublicId={listPublicId}
          itemPublicIds={itemPublicIds}
          status={status}
          closeDropdown={closeDropdown}
        />
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
        <DeleteItemOption
          listPublicId={listPublicId}
          itemPublicIds={itemPublicIds}
          closeDropdown={closeDropdown}
          onDelete={onDelete}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
