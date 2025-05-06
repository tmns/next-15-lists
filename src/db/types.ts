import * as schema from "./schema";

export type List = Omit<typeof schema.lists.$inferSelect, "id">;

export type Item = Omit<typeof schema.items.$inferSelect, "id">;

export type ItemStatus = "not_started" | "in_progress" | "done";
