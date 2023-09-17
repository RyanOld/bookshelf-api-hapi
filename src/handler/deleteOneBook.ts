import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
// import type { BookRequest, BookStorage } from "../types";
import { getBooksData, writeBooksData } from "./dataManager";
import { findBookId } from "./findBookId";

export const deleteOneBook = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // do book id lookup. if not found, send error.
  const { bookId } = request.params;
  const booksData = getBooksData();
  const matchingBook = findBookId(booksData, bookId);
  if (typeof matchingBook === "undefined") {
    // send error : book not found
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

  // if found, remove book w/ matching id, rewrite books data(books.json)
  booksData.splice(
    booksData.findIndex((book) => bookId === book.id),
    1
  );
  writeBooksData(booksData);
  // send success message
  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
};
