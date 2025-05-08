import { OPTIMISTIC_ID, OPTIMISTIC_OWNER_ID } from "@/db/consts";
import { api } from "convex-utils/api";
import { Id } from "convex-utils/dataModel";
import { useMutation } from "convex/react";

export function useAddListMutation() {
  return useMutation(api.lists.add).withOptimisticUpdate(
    (localStore, { name }) => {
      const existingLists = localStore.getQuery(api.lists.findAll);
      if (existingLists === undefined) {
        return;
      }

      const newList = {
        _id: OPTIMISTIC_ID as Id<"lists">,
        _creationTime: Date.now(),
        name,
        ownerId: OPTIMISTIC_OWNER_ID,
      };

      localStore.setQuery(api.lists.findAll, {}, [...existingLists, newList]);
    }
  );
}

export function useDeleteListMutation() {
  return useMutation(api.lists.remove).withOptimisticUpdate(
    (localStore, { id }) => {
      const existingLists = localStore.getQuery(api.lists.findAll);
      if (existingLists === undefined) {
        return;
      }

      const filteredLists = existingLists.filter((list) => list._id !== id);

      localStore.setQuery(api.lists.findAll, {}, [...filteredLists]);
    }
  );
}

export function useUpdateListMutation() {
  return useMutation(api.lists.update).withOptimisticUpdate(
    (localStore, { id, update }) => {
      const existingLists = localStore.getQuery(api.lists.findAll);
      if (existingLists === undefined) {
        return;
      }

      const updatedLists = existingLists.map((list) => {
        if (list._id !== id) {
          return list;
        }

        return {
          ...list,
          ...update,
          _id: OPTIMISTIC_ID as Id<"lists">,
        };
      });

      localStore.setQuery(api.lists.findAll, {}, [...updatedLists]);
    }
  );
}
