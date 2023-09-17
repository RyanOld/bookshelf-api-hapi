import { writeFileSync } from "fs";
import { dataPath } from "./dataPath";
import type { BookStorage } from "../../types";

export const writeBooksData = (newBooks: BookStorage[]): void => {
  writeFileSync(dataPath, JSON.stringify(newBooks));
};
