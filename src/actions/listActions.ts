"use server";

import { getAuth } from "@/actions/utils";
import { db } from "@/db";

export async function getLists() {
  const { userId } = await getAuth();

  const data = await db.query.lists.findMany({
    where: (list, { eq }) => eq(list.ownerId, userId),
  });

  return data;
}
