import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a snake_case string to Title Case with spaces.
 * Example: "in_progress" -> "In Progress"
 */
export function snakeToTitleCase(str: string): string {
  return str
    .replace(/(?:^|_)([a-z])/g, (_, letter) => ` ${letter.toUpperCase()}`)
    .trim();
}
