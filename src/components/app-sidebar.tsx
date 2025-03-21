import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { ListTodo } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center gap-2 mb-4">
            <ListTodo className="h-6 w-6" />
            <h1 className="text-xl font-bold">Lists</h1>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>Lists go here</SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex p-2 hover:bg-sidebar-accent">
            <SidebarMenuButton size="lg" asChild>
              <UserButton
                showName
                appearance={{
                  elements: {
                    rootBox: {
                      width: "100%",
                    },
                    userButtonTrigger: {
                      width: "100%",
                      justifyContent: "flex-start",
                    },
                    userButtonBox: {
                      flexDirection: "row-reverse",
                    },
                    userButtonOuterIdentifier: {
                      color: "var(--sidebar-primary-foreground)",
                    },
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
