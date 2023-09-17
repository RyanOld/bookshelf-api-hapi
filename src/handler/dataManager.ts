import type { BookStorage } from "../types";
import { readFileSync, writeFileSync } from "fs";

// This file contains all the needed functions to manipulate the "database"
const dataPath = "src/books.json";

export const resetBooksData = (): void => {
  writeFileSync("src/books.json", "[]");
};

export const getBooksData = (): string => {
  return readFileSync(dataPath, "utf-8");
};

export const writeBooksData = (newBooks: BookStorage[]): void => {
  writeFileSync(dataPath, JSON.stringify(newBooks));
};
