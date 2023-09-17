import type { BookStorage } from "../types";

// used to find the first book with matching id. returns the book data if match is found.
// otherwise returns undefined.
export const findBookId = (
  booksData: BookStorage[],
  bookId: string
): BookStorage | undefined => {
  return booksData.find((book: BookStorage) => book.id === bookId);
};
