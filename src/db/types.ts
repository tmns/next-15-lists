import * as schema from "./schema";

export type List = Omit<typeof schema.lists.$inferSelect, "id">;
