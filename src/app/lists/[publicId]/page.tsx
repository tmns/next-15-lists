import { getListAction } from "@/actions/listActions";
import { ItemsTable } from "@/components/items-table/items-table";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { publicId } = await params;

  const list = await getListAction(publicId);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {list?.name ?? "Lists"}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {list ? (
          <ItemsTable items={list.items} listPublicId={list.publicId} />
        ) : (
          <div>List not found</div>
        )}
      </div>
    </>
  );
}
