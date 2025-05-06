import { getListsAction } from "@/actions/listActions";
import { redirect } from "next/navigation";

export default async function Page() {
  const lists = await getListsAction();

  if (lists.length === 0) {
    return <p>Create a list to get started</p>;
  }

  redirect(`/lists/${lists[0].publicId}`);
}
