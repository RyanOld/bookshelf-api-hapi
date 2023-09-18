import type { ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { getBooksData } from "../utils/dataManager";

export const getBooksWithFinished = (
  h: ResponseToolkit,
  finishedString: string
): ResponseObject => {
  // read books data, iterate with forEach, return result array.
  const finished = JSON.parse(finishedString) as number;
  const booksData = getBooksData();

  const filteredBooks = booksData.filter(
    (book) => book.finished === finished > 0
  );
  // take only the id, name, and publisher properties from result to be returned
  const result = filteredBooks.map((book) => {
    return { id: book.id, name: book.name, publisher: book.publisher };
  });

  // return success response.
  return h.response({
    status: "success",
    data: { books: result },
  });
};
