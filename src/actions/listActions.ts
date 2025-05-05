"use server";

import { getAuth } from "@/actions/utils";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { List } from "@/db/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getListsAction = cache(async (): Promise<List[]> => {
  const { userId } = await getAuth();

  const lists = await db.query.lists.findMany({
    where: (list, { eq }) => eq(list.ownerId, userId),
  });

  return lists;
});

export const deleteListAction = async (id: number) => {
  const { userId } = await getAuth();

  await db.delete(lists).where(eq(lists.ownerId, userId) && eq(lists.id, id));

  revalidatePath("/lists");
};

export const editListAction = async (id: number, name: string) => {
  const { userId } = await getAuth();

  if (!name) {
    return;
  }

  await db
    .update(lists)
    .set({ name })
    .where(eq(lists.ownerId, userId) && eq(lists.id, id));

  revalidatePath("/lists");
};
