import {
  serial,
  integer,
  boolean,
  varchar,
  pgTable,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 100 }).unique(),
  password: varchar("password", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 30 }),
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
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

export type Order = InferSelectModel<typeof clientOrders>;
export type OrderInsert = InferInsertModel<typeof clientOrders>;

export type Tour = InferSelectModel<typeof tours>;
export type TourInsert = InferInsertModel<typeof tours>;
