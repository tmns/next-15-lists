import { getListAction } from "@/actions/listActions";
import { AppMainContent } from "@/components/app-main-content";
import { ItemsTable } from "@/components/items-table/items-table";

interface Props {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { publicId } = await params;

  const list = await getListAction(publicId);

  return (
    <AppMainContent listName={list?.name}>
      {list ? (
        <ItemsTable items={list.items} listPublicId={list.publicId} />
      ) : (
        <div>List not found</div>
      )}
    </AppMainContent>
  );
}
