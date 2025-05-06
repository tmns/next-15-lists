import { getListsAction } from "@/actions/listActions";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const lists = await getListsAction();

  return (
    <SidebarProvider>
      <AppSidebar lists={lists} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
