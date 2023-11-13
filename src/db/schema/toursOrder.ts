import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { compilations } from "./compilations";
import type { Tour } from "./tours";

export const toursOrder = pgTable("tours_order", {
  id: serial("id").primaryKey(),
  compilationId: varchar("compilation_id")
    .references(() => compilations.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  // will be infered as number[]
  sortOrder: json("sort_order").$type<Tour["id"][]>().notNull(),
});

export type ToursOrder = typeof toursOrder.$inferSelect;
export type NewToursOrder = typeof toursOrder.$inferInsert;
