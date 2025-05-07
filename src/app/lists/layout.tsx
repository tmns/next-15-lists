import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { preloadQuery } from "convex/nextjs";
import { getAuthToken } from "@/db/auth";
import { api } from "convex-utils/api";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const token = await getAuthToken();
  const lists = await preloadQuery(api.lists.findAll, {}, { token });

  return (
    <SidebarProvider>
      <AppSidebar preloadedLists={lists} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
