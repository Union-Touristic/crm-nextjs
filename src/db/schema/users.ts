import { pgTable, varchar } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("users", {
  id: varchar("id", { length: 36 })
    .$default(() => uuidv4())
    .primaryKey(),
  name: varchar("name", { length: 50 }),
  email: varchar("email", { length: 100 }).unique(),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
