import * as React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ListTodo } from "lucide-react";
import { AppSidebarFooter } from "@/components/app-sidebar/app-sidebar-footer";
import { AppSidebarContent } from "@/components/app-sidebar/app-sidebar-content";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="mb-4 flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            <h1 className="text-xl font-bold">Lists</h1>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <AppSidebarContent />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
