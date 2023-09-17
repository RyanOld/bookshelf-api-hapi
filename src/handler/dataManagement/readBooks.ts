import { readFileSync } from "fs";
import { dataPath } from "./dataPath";

export const getBooksData = (): string => {
  return readFileSync(dataPath, "utf-8");
};
