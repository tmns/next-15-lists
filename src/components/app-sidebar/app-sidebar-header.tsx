import { SidebarHeader } from "@/components/ui/sidebar";
import { ListTodo } from "lucide-react";

export function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <div className="mb-4 flex items-center gap-2">
        <ListTodo className="size-6" />
        <h1 className="text-xl font-bold">Lists</h1>
      </div>
    </SidebarHeader>
  );
}
