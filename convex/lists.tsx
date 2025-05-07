import { query } from "./_generated/server";

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
