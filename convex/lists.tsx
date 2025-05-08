import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const findAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("lists")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .order("asc")
      .collect();
  },
});

export const add = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("lists", {
      name: args.name,
      ownerId: identity.subject,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("lists"),
    update: v.object({
      name: v.string(),
    }),
  },
  handler: async (ctx, { id, update }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const list = await ctx.db.get(id);

    if (list?.ownerId !== identity.subject) {
      throw new Error("List not found");
    }

    await ctx.db.patch(id, update);
  },
});

export const remove = mutation({
  args: { id: v.id("lists") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const list = await ctx.db.get(id);

    if (list?.ownerId !== identity.subject) {
      throw new Error("List not found");
    }

    await ctx.db.delete(id);
  },
});
