import * as React from "react";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { AppSidebarFooter } from "@/components/app-sidebar/app-sidebar-footer";
import { AppSidebarContent } from "@/components/app-sidebar/app-sidebar-content/app-sidebar-content";
import { AppSidebarHeader } from "@/components/app-sidebar/app-sidebar-header";
import { List } from "@/db/types";

interface Props extends React.ComponentProps<typeof Sidebar> {
  lists: List[];
}

export function AppSidebar({ lists, ...props }: Props) {
  return (
    <Sidebar {...props} variant="inset">
      <AppSidebarHeader />
      <AppSidebarContent lists={lists} />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
