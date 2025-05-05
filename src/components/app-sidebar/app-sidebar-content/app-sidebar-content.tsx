import { ListDropdown } from "@/components/app-sidebar/app-sidebar-content/list-dropdown/list-dropdown";
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
        {lists.map(({ publicId, name }) => (
          <SidebarMenuItem key={publicId}>
            <SidebarMenuButton asChild>
              <Link href={`/lists/${publicId}`}>
                {/* `span` necessary here to ensure truncation works properly */}
                <span>{name}</span>
              </Link>
            </SidebarMenuButton>
            <ListDropdown id={publicId} name={name} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
