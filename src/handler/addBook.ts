import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookRequest, BookStorage } from "../types";
import * as fs from "fs";
import { nanoid } from "nanoid";

export const addBook = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // try block for looking for errors.
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload as BookRequest;

    const bookId = nanoid(16);
    const dateAdded = new Date().toISOString();
    const addedBook: BookStorage = {
      id: bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: false,
      reading,
      insertedAt: dateAdded,
      updatedAt: dateAdded,
    };
    const newBooks: BookStorage[] = JSON.parse(
      fs.readFileSync("src/books.json", "utf-8")
    ).push(addedBook);
    fs.writeFileSync("src/books.json", JSON.stringify(newBooks));
  } catch (error) {
    // if an error is catched, send back error as response.
    if (error instanceof Error) {
      return h.response(error);
    }
  }

  return h.response("all okay");
};
