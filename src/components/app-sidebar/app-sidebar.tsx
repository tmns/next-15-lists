import * as React from "react";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { AppSidebarFooter } from "@/components/app-sidebar/app-sidebar-footer";
import { AppSidebarContent } from "@/components/app-sidebar/app-sidebar-content/app-sidebar-content";
import { AppSidebarHeader } from "@/components/app-sidebar/app-sidebar-header";
import { Preloaded } from "convex/react";
import { api } from "convex-utils/api";

interface Props extends React.ComponentProps<typeof Sidebar> {
  preloadedLists: Preloaded<typeof api.lists.findAll>;
}

export function AppSidebar({ preloadedLists, ...props }: Props) {
  return (
    <Sidebar {...props} variant="inset">
      <AppSidebarHeader />
      <AppSidebarContent preloadedLists={preloadedLists} />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
