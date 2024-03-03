import { ZtwoLetterCountryCodes } from "@/types/zod/twoLetterCountryCodes";
import { z } from "zod";

type CountryDialingCode = {
  id: string;
  callingCode: string;
  name: string;
  nativeName: string;
  flag: string;
};

export const countryDialingCodes: Record<
  z.infer<typeof ZtwoLetterCountryCodes>,
  CountryDialingCode
> = {
  KZ: {
    id: "KZ",
    callingCode: "+7",
    name: "Kazakhstan",
    nativeName: "Қазақстан",
    flag: "🇰🇿",
  },
  KG: {
    id: "KG",
    callingCode: "+996",
    name: "Kyrgyzstan",
    nativeName: "Кыргызстан",
    flag: "🇰🇬",
  },
  UA: {
    id: "UA",
    callingCode: "+380",
    name: "Ukraine",
    nativeName: "Україна",
    flag: "🇺🇦",
  },
  TR: {
    id: "TR",
    callingCode: "+90",
    name: "Türkiye",
    nativeName: "Türkiye",
    flag: "🇹🇷",
  },
  RU: {
    id: "RU",
    callingCode: "+7",
    name: "Russia",
    nativeName: "Россия",
    flag: "🇷🇺",
  },
};
