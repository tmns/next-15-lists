import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const findAll = query({
  args: { listId: v.id("lists") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("items")
      .withIndex("by_list_owner", (q) =>
        q.eq("listId", args.listId).eq("ownerId", identity.subject)
      )
      .order("asc")
      .collect();
  },
});

export const add = mutation({
  args: { title: v.string(), listId: v.id("lists") },
  handler: async (ctx, { title, listId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return;
    }

    await ctx.db.insert("items", {
      title,
      listId,
      status: "not_started",
      ownerId: identity.subject,
    });
  },
});

export const update = mutation({
  args: {
    ids: v.array(v.id("items")),
    listId: v.id("lists"),
    update: v.object({
      title: v.optional(v.string()),
      status: v.optional(
        v.union(
          v.literal("not_started"),
          v.literal("in_progress"),
          v.literal("done")
        )
      ),
    }),
  },
  handler: async (ctx, { ids, listId, update }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return;
    }

    for (const id of ids) {
      const item = await ctx.db.get(id);

      if (item?.listId !== listId || item?.ownerId !== identity.subject) {
        continue;
      }

      await ctx.db.patch(id, update);
    }
  },
});

export const remove = mutation({
  args: { ids: v.array(v.id("items")), listId: v.id("lists") },
  handler: async (ctx, { ids, listId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return;
    }

    for (const id of ids) {
      const item = await ctx.db.get(id);

      if (item?.listId !== listId || item?.ownerId !== identity.subject) {
        continue;
      }

      await ctx.db.delete(id);
    }
  },
});
