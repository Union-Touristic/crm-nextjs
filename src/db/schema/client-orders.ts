import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const clientOrders = pgTable("client_orders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 30 }),
  isActive: boolean("is_active").default(true),
  source: varchar("source", { length: 60 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ClientOrder = typeof clientOrders.$inferSelect;
export type NewClientOrder = typeof clientOrders.$inferInsert;
