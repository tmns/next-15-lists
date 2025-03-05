import { timestamps } from "@/db/columns.helpers";
import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, boolean, index } from "drizzle-orm/pg-core";

export const lists = pgTable(
  "lists",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    ownerId: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull().unique(),
    ...timestamps,
  },
  (table) => [index("name_idx").on(table.name)]
);

export const listsRelations = relations(lists, ({ many }) => ({
  items: many(items),
}));

export const items = pgTable(
  "items",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    ownerId: varchar({ length: 255 }).notNull(),
    listId: integer("list_id").references(() => lists.id, {
      onDelete: "cascade",
    }),
    title: varchar({ length: 255 }).notNull().unique(),
    isChecked: boolean().notNull().default(false),
    ...timestamps,
  },
  (table) => [index("title_idx").on(table.title)]
);

export const itemsRelations = relations(items, ({ one }) => ({
  author: one(lists, { fields: [items.listId], references: [lists.id] }),
}));
