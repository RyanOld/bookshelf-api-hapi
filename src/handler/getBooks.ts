import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookStorage } from "../types";
import { getBooksData } from "./utils/dataManager";
import { getBooksWithReading } from "./subhandler/getBooksWithReading";

export const getBooks = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // check for query parameters to be handled separately.
  // console.log(request.query);
  // const { readingQuery, finishedQuery, nameQuery } = request.query;
  const { reading } = request.query;
  if (typeof reading !== "undefined") {
    return getBooksWithReading(h, reading);
  }
  // else if (typeof finishedQuery !== "undefined") {
  //   return getBooksWithFinished(h, finishedQuery);
  // } else if (typeof nameQuery !== "undefined") {
  //   return getBooksWithName(h, nameQuery);
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
