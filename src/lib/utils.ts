import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function txtCenter(
  inputString: string,
  length: number = 50,
  fillchar: string = "="
) {
  // If the input string is longer than or equal to the desired length, return it as is
  if (inputString.length >= length) {
    return inputString;
  }

  // Calculate how many characters to pad on each side
  const totalPadding = length - inputString.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;

  // Create the padded string by repeating the fill character
  const paddedString =
    fillchar.repeat(leftPadding) + inputString + fillchar.repeat(rightPadding);

  return paddedString;
}
