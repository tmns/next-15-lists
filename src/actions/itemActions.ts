"use server";

import { getAuth } from "@/actions/utils";
import { db } from "@/db";
import { items, lists } from "@/db/schema";
import { ItemStatus } from "@/db/types";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createItemAction = async (listId: string, title: string) => {
  if (!title) {
    throw new Error("Title is required");
  }

  const { userId } = await getAuth();

  const list = await db.query.lists.findFirst({
    where: (list) => eq(lists.ownerId, userId) && eq(list.publicId, listId),
  });

  if (!list) {
    throw new Error("Item not found");
  }

  await db.insert(items).values({ title, listId: list.id, ownerId: userId });

  revalidatePath(`/lists/${listId}`);
};

export const editItemAction = async (
  listPublicId: string,
  itemPublicId: string,
  title: string
) => {
  if (!title) {
    throw new Error("Title is required");
  }

  const { userId } = await getAuth();

  const list = await db.query.lists.findFirst({
    where: (list) =>
      eq(lists.ownerId, userId) && eq(list.publicId, listPublicId),
  });

  if (!list) {
    throw new Error("Item not found");
  }

  await db
    .update(items)
    .set({ title })
    .where(eq(lists.ownerId, userId) && eq(items.publicId, itemPublicId));

  revalidatePath(`/lists/${listPublicId}`);
};

export const deleteItemAction = async (
  listPublicId: string,
  itemPublicIds: string[]
) => {
  const { userId } = await getAuth();

  const list = await db.query.lists.findFirst({
    where: (list) =>
      eq(lists.ownerId, userId) && eq(list.publicId, listPublicId),
  });

  if (!list) {
    throw new Error("Item not found");
  }

  await db
    .delete(items)
    .where(
      eq(lists.ownerId, userId) &&
        eq(items.listId, list.id) &&
        inArray(items.publicId, itemPublicIds)
    );

  revalidatePath(`/lists/${listPublicId}`);
};

export const changeItemStatusAction = async (
  listPublicId: string,
  itemPublicIds: string[],
  status: string
) => {
  if (!status) {
    throw new Error("Status is required");
  }

  const { userId } = await getAuth();

  const list = await db.query.lists.findFirst({
    where: (list) =>
      eq(lists.ownerId, userId) && eq(list.publicId, listPublicId),
  });

  if (!list) {
    throw new Error("Item not found");
  }

  if (!["not_started", "in_progress", "done"].includes(status)) {
    throw new Error("Invalid status");
  }

  await db
    .update(items)
    .set({ status: status as ItemStatus })
    .where(
      eq(lists.ownerId, userId) &&
        eq(items.listId, list.id) &&
        inArray(items.publicId, itemPublicIds)
    );

  revalidatePath(`/lists/${listPublicId}`);
};
