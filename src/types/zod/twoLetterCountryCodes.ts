import { z } from "zod";

export const ZtwoLetterCountryCodes = z.union([
  z.literal("KZ"),
  z.literal("RU"),
  z.literal("UA"),
  z.literal("TR"),
  z.literal("KG"),
]);
// equivalent to type TwoLetterCountryCodes = "KZ" | "RU" | "UA" | "TR" | "KG";
