"use server";

import { getAuth } from "@/actions/utils";
import { db } from "@/db";
import { items, lists } from "@/db/schema";
import { Item } from "@/db/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const createItemAction = async (listId: string, title: string) => {
  const { userId } = await getAuth();

  if (!title) {
    throw new Error("Title is required");
  }

  const list = await db.query.lists.findFirst({
    where: (list, { eq }) =>
      eq(lists.ownerId, userId) && eq(list.publicId, listId),
  });

  if (!list) {
    throw new Error("List not found");
  }

  await db.insert(items).values({ title, listId: list.id, ownerId: userId });

  revalidatePath(`/lists/${listId}`);
};

export const editItemAction = async (
  listPublicId: string,
  itemPublicId: string,
  title: string
) => {
  const { userId } = await getAuth();

  if (!title) {
    throw new Error("Title is required");
  }

  const list = await db.query.lists.findFirst({
    where: (list, { eq }) =>
      eq(lists.ownerId, userId) && eq(list.publicId, listPublicId),
  });

  if (!list) {
    throw new Error("List not found");
  }

  await db
    .update(items)
    .set({ title })
    .where(eq(lists.ownerId, userId) && eq(items.publicId, itemPublicId));

  revalidatePath(`/lists/${listPublicId}`);
};
