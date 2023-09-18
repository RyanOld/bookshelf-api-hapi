import type { ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { getBooksData } from "../utils/dataManager";

export const getBooksWithReading = (
  h: ResponseToolkit,
  readingString: string
): ResponseObject => {
  // read books data, iterate with forEach, return result array.
  const reading = JSON.parse(readingString) as number;
  const booksData = getBooksData();

  const filteredBooks = booksData.filter(
    (book) => book.reading === reading > 0
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
