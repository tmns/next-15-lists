import { timestamp } from "drizzle-orm/pg-core";
import { customAlphabet } from "nanoid";

export const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
};

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const LENGTH = 12;
const nanoid = customAlphabet(ALPHABET, LENGTH);

export function generatePublicId() {
  return nanoid();
}
