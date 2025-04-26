import { ListDropdown } from "@/components/app-sidebar/app-sidebar-content/list-dropdown";
import {
  SidebarContent,
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
    <SidebarContent className="px-3">
      <SidebarMenu>
        {lists.map(({ id, name }) => (
          <SidebarMenuItem key={id}>
            <SidebarMenuButton asChild>
              <Link href={`/lists/${id}`}>{name}</Link>
            </SidebarMenuButton>
            <ListDropdown id={id} name={name} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
