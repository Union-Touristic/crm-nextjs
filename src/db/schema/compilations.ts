import { relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { tours } from "./tours";
import { toursOrder } from "./toursOrder";
import { users } from "./users";

export const compilations = pgTable("compilations", {
  id: varchar("id", { length: 36 })
    .$default(() => uuidv4())
    .primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const compilationsRelations = relations(
  compilations,
  ({ one, many }) => ({
    toursOrder: one(toursOrder, {
      fields: [compilations.id],
      references: [toursOrder.compilationId],
    }),
    tours: many(tours),
  }),
);

export type Compilation = typeof compilations.$inferSelect;
export type NewCompilation = typeof compilations.$inferInsert;
