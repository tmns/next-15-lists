import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lists: defineTable({
    name: v.string(),
    ownerId: v.string(),
  }).index("by_owner", ["ownerId"]),
  items: defineTable({
    title: v.string(),
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("done")
    ),
    listId: v.id("lists"),
    ownerId: v.string(),
  }).index("by_list_owner", ["listId", "ownerId"]),
});
