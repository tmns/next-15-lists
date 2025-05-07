import { v } from "convex/values";
import { query } from "./_generated/server";

export const findAll = query({
  args: { listId: v.id("lists") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
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
