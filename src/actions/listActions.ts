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
    columns: { id: false },
    orderBy: (list, { asc }) => [asc(list.createdAt)],
  });

  return lists;
});

export const createListAction = async (name: string) => {
  const { userId } = await getAuth();

  if (!name) {
    throw new Error("Name is required");
  }

  const result = await db
    .insert(lists)
    .values({ name, ownerId: userId })
    .returning({ publicId: lists.publicId });

  revalidatePath("/lists");

  return result[0].publicId;
};

export const deleteListAction = async (publicId: string) => {
  const { userId } = await getAuth();

  await db
    .delete(lists)
    .where(eq(lists.ownerId, userId) && eq(lists.publicId, publicId));

  revalidatePath("/lists");
};

export const editListAction = async (publicId: string, name: string) => {
  const { userId } = await getAuth();

  if (!name) {
    throw new Error("Name is required");
  }

  await db
    .update(lists)
    .set({ name })
    .where(eq(lists.ownerId, userId) && eq(lists.publicId, publicId));

  revalidatePath("/lists");
};

export const getListAction = cache(async (publicId: string) => {
  const { userId } = await getAuth();

  const list = await db.query.lists.findFirst({
    where: (list, { eq }) =>
      eq(list.ownerId, userId) && eq(list.publicId, publicId),
    columns: {
      id: false,
    },
    with: {
      items: true,
    },
  });

  return list;
});
