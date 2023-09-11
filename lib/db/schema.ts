import {
  int,
  varchar,
  mysqlTable,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  password: varchar("password", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 30 }),
});

export const clientOrders = mysqlTable("client_orders", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 30 }),
  isActive: boolean("is_active"),
  createdAt: timestamp("created_at").defaultNow(),
});
