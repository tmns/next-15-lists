"use client";

import { AddListButton } from "@/components/app-sidebar/app-sidebar-content/add-list-button";
import { ListDropdown } from "@/components/app-sidebar/app-sidebar-content/list-dropdown/list-dropdown";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { api } from "convex-utils/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Link from "next/link";

interface Props {
  preloadedLists: Preloaded<typeof api.lists.findAll>;
}

export function AppSidebarContent({ preloadedLists }: Props) {
  const lists = usePreloadedQuery(preloadedLists);

  return (
    <SidebarContent>
      <SidebarMenu>
        <SidebarGroup>
          <SidebarGroupLabel>All</SidebarGroupLabel>
          <AddListButton />
          <SidebarGroupContent>
            {lists.map(({ _id, name }) => (
              <SidebarMenuItem key={_id}>
                <SidebarMenuButton asChild>
                  <Link href={`/lists/${_id}`}>
                    {/* `span` necessary here to ensure truncation works properly */}
                    <span>{name}</span>
                  </Link>
                </SidebarMenuButton>
                <ListDropdown _id={_id} name={name} lists={lists} />
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarMenu>
    </SidebarContent>
  );
}
