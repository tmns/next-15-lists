import { getLists } from "@/actions/listActions";
import { SidebarContent } from "@/components/ui/sidebar";

export async function AppSidebarContent() {
  const lists = await getLists();

  return <SidebarContent>{JSON.stringify(lists)}</SidebarContent>;
}
