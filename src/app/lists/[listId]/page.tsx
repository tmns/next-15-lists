import { AppMainContent } from "@/components/app-main-content";
import { ItemsTable } from "@/components/items-table/items-table";
import { preloadQuery } from "convex/nextjs";
import { getAuthToken } from "@/db/auth";
import { Id } from "convex-utils/dataModel";
import { api } from "convex-utils/api";

interface Props {
  params: Promise<{
    listId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const [{ listId }, token] = await Promise.all([params, getAuthToken()]);

  const items = await preloadQuery(
    api.items.findAll,
    {
      listId: listId as Id<"lists">,
    },
    { token }
  );

  return (
    <AppMainContent>
      <ItemsTable preloadedItems={items} listId={listId as Id<"lists">} />
    </AppMainContent>
  );
}
