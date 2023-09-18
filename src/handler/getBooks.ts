import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookStorage } from "../types";
import { getBooksData } from "./utils/dataManager";

export const getBooks = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // check for query parameters to be handled separately.
  // const { readingQuery, finishedQuery, nameQuery } = request.query;
  // if (typeof readingQuery === "undefined") {
  //   return getBooksWithReading()
  // } else if (typeof finishedQuery === "undefined") {
  //   return getBooksWithFinished()
  // } else if (typeof nameQuery === "undefined") {
  //   return getBooksWithName()
  // }
  // read books data.
  const booksData = getBooksData();
  const result = booksData.map((book: BookStorage) => {
    // deconstruct to get only the needed props and rename bookId => id
    const { id, name, publisher } = book;
    return { id, name, publisher };
  });

  return h
    .response({
      status: "success",
      data: { books: result },
    })
    .code(200);
};
