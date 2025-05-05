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
import { List } from "@/db/types";
import Link from "next/link";

interface Props {
  lists: List[];
}

export async function AppSidebarContent({ lists }: Props) {
  return (
    <SidebarContent>
      <SidebarMenu>
        <SidebarGroup>
          <SidebarGroupLabel>All</SidebarGroupLabel>
          <AddListButton />
          <SidebarGroupContent>
            {lists.map(({ publicId, name }) => (
              <SidebarMenuItem key={publicId}>
                <SidebarMenuButton asChild>
                  <Link href={`/lists/${publicId}`}>
                    {/* `span` necessary here to ensure truncation works properly */}
                    <span>{name}</span>
                  </Link>
                </SidebarMenuButton>
                <ListDropdown publicId={publicId} name={name} />
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarMenu>
    </SidebarContent>
  );
}
