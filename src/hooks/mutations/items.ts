import { OPTIMISTIC_ID, OPTIMISTIC_OWNER_ID } from "@/db/consts";
import { api } from "convex-utils/api";
import { Id } from "convex-utils/dataModel";
import { useMutation } from "convex/react";

export function useAddItemMutation() {
  return useMutation(api.items.add).withOptimisticUpdate(
    (localStore, { title, listId }) => {
      const existingItems = localStore.getQuery(api.items.findAll, {
        listId,
      });
      if (existingItems === undefined) {
        return;
      }

      const newItem = {
        _id: OPTIMISTIC_ID as Id<"items">,
        _creationTime: Date.now(),
        title,
        listId,
        status: "not_started" as const,
        ownerId: OPTIMISTIC_OWNER_ID,
      };

      localStore.setQuery(api.items.findAll, { listId }, [
        ...existingItems,
        newItem,
      ]);
    }
  );
}

export function useUpdateItemMutation() {
  return useMutation(api.items.update).withOptimisticUpdate(
    (localStore, { ids, listId, update }) => {
      const existingItems = localStore.getQuery(api.items.findAll, {
        listId,
      });
      if (existingItems === undefined) {
        return;
      }

      const updatedItems = existingItems.map((item) => {
        if (!ids.includes(item._id)) {
          return item;
        }

        return { ...item, ...update, _id: OPTIMISTIC_ID as Id<"items"> };
      });

      localStore.setQuery(api.items.findAll, { listId }, updatedItems);
    }
  );
}

export function useDeleteItemMutation() {
  return useMutation(api.items.remove).withOptimisticUpdate(
    (localStore, { ids, listId }) => {
      const existingItems = localStore.getQuery(api.items.findAll, {
        listId,
      });
      if (existingItems === undefined) {
        return;
      }

      const filteredItems = existingItems.filter(
        (item) => !ids.includes(item._id)
      );

      localStore.setQuery(api.items.findAll, { listId }, [...filteredItems]);
    }
  );
}
