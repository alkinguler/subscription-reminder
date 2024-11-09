import { clsx, type ClassValue } from "clsx";
import { toLower } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toLowerAndTrimSpaces = (str: string) =>
  toLower(str).replace(/\s/g, "");
