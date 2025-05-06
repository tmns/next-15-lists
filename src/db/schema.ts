import { generatePublicId, timestamps } from "@/db/columns.helpers";
import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, index } from "drizzle-orm/pg-core";

export const lists = pgTable(
  "lists",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    publicId: varchar({ length: 12 })
      .notNull()
      .unique()
      .$defaultFn(() => generatePublicId()),
    ownerId: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull().unique(),
    ...timestamps,
  },
  (table) => [
    index("lists_public_id_idx").on(table.publicId),
    index("name_idx").on(table.name),
  ]
);

export const listsRelations = relations(lists, ({ many }) => ({
  items: many(items),
}));

export const items = pgTable(
  "items",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    publicId: varchar({ length: 12 })
      .notNull()
      .unique()
      .$defaultFn(() => generatePublicId()),
    ownerId: varchar({ length: 255 }).notNull(),
    listId: integer("list_id").references(() => lists.id, {
      onDelete: "cascade",
    }),
    title: varchar({ length: 255 }).notNull().unique(),
    status: varchar({
      length: 32,
      enum: ["not_started", "in_progress", "done"],
    })
      .notNull()
      .default("not_started"),
    ...timestamps,
  },
  (table) => [
    index("items_public_id_idx").on(table.publicId),
    index("title_idx").on(table.title),
  ]
);

export const itemsRelations = relations(items, ({ one }) => ({
  author: one(lists, { fields: [items.listId], references: [lists.id] }),
}));
