import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(value: string, start = 4, end = 6) {
  return value.slice(0, start) + "..." + value.slice(-end);
}
