import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookStorage } from "../types";
import { getBooksData } from "./utils/dataManager";
import { getBooksWithReading } from "./subhandler/getBooksWithReading";
import { getBooksWithFinished } from "./subhandler/getBooksWithFinished";
import { getBooksWithName } from "./subhandler/getBooksWithName";

export const getBooks = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // check for query parameters to be handled separately.
  const { reading, finished, name } = request.query;

  // handle get operation depending on which query parameter is defined.
  if (typeof reading !== "undefined") {
    return getBooksWithReading(h, reading);
  } else if (typeof finished !== "undefined") {
    return getBooksWithFinished(h, finished);
  } else if (typeof name !== "undefined") {
    return getBooksWithName(h, name);
  }
  // if none of the above 3 query params are defined, run below logics.

  // read books data.
  const booksData = getBooksData();
  const result = booksData.map((book: BookStorage) => {
    // deconstruct to get only the needed props and rename bookId => id
    const { id, name, publisher } = book;
    return { id, name, publisher };
  });

  return h.response({
    status: "success",
    data: { books: result },
  });
};
