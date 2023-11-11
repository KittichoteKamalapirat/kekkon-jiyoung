import { type ClassValue, clsx } from "clsx";
import { UAParser } from "ua-parser-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const uaParser = new UAParser();
export const isMobile = uaParser.getDevice().type === "mobile";

// path is from usePathname
export const isJapaneseLocale = (path: string) => path.includes("ja");
