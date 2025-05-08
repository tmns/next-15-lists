"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, snakeToTitleCase } from "@/lib/utils";
import { ItemDropdown } from "@/components/items-table/item-dropdown/item-dropdown";
import { AddItemButton } from "@/components/items-table/add-item-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Item } from "@/db/types";
import { api } from "convex-utils/api";
import { OPTIMISTIC_ID } from "@/db/consts";
import { Id } from "convex-utils/dataModel";

interface Props {
  listId: Id<"lists">;
  preloadedItems: Preloaded<typeof api.items.findAll>;
}

export function ItemsTable({ listId, preloadedItems }: Props) {
  const items = usePreloadedQuery(preloadedItems);

  const columns: ColumnDef<Item>[] = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-x-1">
              Status
              <Button
                className={cn(
                  "cursor-pointer bg-transparent px-1 hover:bg-transparent",
                  "text-muted-foreground transition-colors hover:text-foreground"
                )}
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <ArrowUpDown />
              </Button>
            </div>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize">
            {snakeToTitleCase(row.getValue("status"))}
          </div>
        ),
      },
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <div className="flex items-center gap-x-1">
              Title
              <Button
                className={cn(
                  "cursor-pointer bg-transparent px-1 hover:bg-transparent",
                  "text-muted-foreground transition-colors hover:text-foreground"
                )}
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <ArrowUpDown />
              </Button>
            </div>
          );
        },
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div
              className={cn(
                "max-w-32 truncate lowercase sm:max-w-52 md:max-w-96",
                item.status === "done" && "line-through opacity-60"
              )}
            >
              {row.getValue("title")}
            </div>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row, table }) => {
          return (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <ItemDropdown
                listId={listId}
                itemIds={[row.original._id]}
                title={row.original.title}
                onDelete={() => {
                  // If we don't do this, whichever rows end up taking the deleted row(s) place(s) will become selected.
                  table.toggleAllRowsSelected(false);
                }}
                status={row.original.status}
              />
            </div>
          );
        },
      },
    ],
    [listId]
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: items,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter items..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) => {
              if (value === "all") {
                table.getColumn("status")?.setFilterValue(undefined);
              } else {
                table.getColumn("status")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {table.getFilteredSelectedRowModel().rows.length > 1 && (
            <ItemDropdown
              listId={listId}
              itemIds={table
                .getFilteredSelectedRowModel()
                .rows.map((row) => row.original._id)}
              onDelete={() => {
                // If we don't do this, whichever rows end up taking the deleted row(s) place(s) will become selected.
                table.toggleAllRowsSelected(false);
              }}
              status={
                table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original.status)[0]
              }
            />
          )}
          <AddItemButton listId={listId} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    row.original._id === OPTIMISTIC_ID
                      ? "pointer-events-none animate-pulse"
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
