import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
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

export const clientOrders = pgTable("client_orders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 30 }),
  isActive: boolean("is_active").default(true),
  source: varchar("source", { length: 60 }),
  createdAt: timestamp("created_at").defaultNow(),
});

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

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  compilationId: varchar("compilation_id").references(() => compilations.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  fromCity: varchar("from_city", { length: 50 }),
  country: varchar("country", { length: 50 }),
  region: varchar("region", { length: 50 }),
  departureDate: varchar("departure_date", { length: 30 }),
  nights: integer("nights"),
  hotel: varchar("hotel", { length: 100 }),
  boardBasis: varchar("board_basis", { length: 30 }),
  roomType: varchar("room_type", { length: 50 }),
  hotelShortDescription: text("hotel_short_description"),
  operator: varchar("operator", { length: 30 }),
  currency: varchar("currency", { length: 10 }),
  price: integer("price"),
});

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export type Order = InferSelectModel<typeof clientOrders>;
export type OrderInsert = InferInsertModel<typeof clientOrders>;

export type Compilation = InferSelectModel<typeof compilations>;
export type CompilationInsert = InferInsertModel<typeof compilations>;

export type Tour = InferSelectModel<typeof tours>;
export type TourInsert = InferInsertModel<typeof tours>;
