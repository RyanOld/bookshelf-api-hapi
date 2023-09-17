import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookStorage } from "../types";
import { getBooksData } from "./dataManager";

export const readBooks = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // read books data.
  const parsedBooks = JSON.parse(getBooksData()) as BookStorage[];
  const result = parsedBooks.map((book: BookStorage) => {
    // deconstruct to get only the needed props and rename bookId => id
    const { bookId, name, publisher } = book;
    return { id: bookId, name, publisher };
  });

  return h
    .response({
      status: "success",
      data: { books: result },
    })
    .code(200);
};
