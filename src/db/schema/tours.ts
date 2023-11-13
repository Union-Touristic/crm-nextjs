import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { compilations } from "./compilations";
import { toursOrder } from "./toursOrder";

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

export const toursRelations = relations(tours, ({ one }) => ({
  compilation: one(compilations, {
    fields: [tours.compilationId],
    references: [compilations.id],
  }),
  toursOrder: one(toursOrder, {
    fields: [tours.compilationId],
    references: [toursOrder.compilationId],
  }),
}));

export const insertTourSchema = createInsertSchema(tours);

export type Tour = typeof tours.$inferSelect;
export type NewTour = typeof tours.$inferInsert;
