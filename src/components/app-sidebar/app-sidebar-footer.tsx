import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export function AppSidebarFooter() {
  return (
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
  );
}
