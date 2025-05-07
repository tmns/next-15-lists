import { AppMainContent } from "@/components/app-main-content";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { getAuthToken } from "@/db/auth";
import { api } from "convex-utils/api";

export default async function Page() {
  const token = await getAuthToken();
  const lists = await fetchQuery(api.lists.findAll, {}, { token });

  if (lists.length === 0) {
    return (
      <AppMainContent>
        <p>Create a list to get started</p>
      </AppMainContent>
    );
  }

  redirect(`/lists/${lists[0]._id}`);
}
