import { getListsAction } from "@/actions/listActions";
import { AppMainContent } from "@/components/app-main-content";
import { redirect } from "next/navigation";

export default async function Page() {
  const lists = await getListsAction();

  if (lists.length === 0) {
    return (
      <AppMainContent>
        <p>Create a list to get started</p>
      </AppMainContent>
    );
  }

  redirect(`/lists/${lists[0].publicId}`);
}
