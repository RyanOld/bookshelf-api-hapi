import type { ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { getBooksData } from "../utils/dataManager";

export const getBooksWithName = (
  h: ResponseToolkit,
  name: string
): ResponseObject => {
  // read books data, iterate with forEach, return result array.
  const booksData = getBooksData();

  const filteredBooks = booksData.filter((book) => book.name.includes(name));
  console.log(filteredBooks);
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
