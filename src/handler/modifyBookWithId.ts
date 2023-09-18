import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookRequest, BookStorage } from "../types";
import { getBooksData, writeBooksData } from "./utils/dataManager";

export const modifyBookWithId = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
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
  // implement checks
  if (name === undefined) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  } else if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  // read books data
  const booksData = getBooksData();

  // take matching single book data
  const { bookId } = request.params;
  const matchingBook = booksData.find((book) => {
    return bookId === book.id;
  });

  // return error if book with matching id is not found
  if (matchingBook === undefined) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  } else {
    // do operations here. then send success message.
    const newBookData: BookStorage = {
      id: matchingBook.id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: pageCount === readPage,
      reading,
      insertedAt: matchingBook.insertedAt,
      updatedAt: new Date().toISOString(),
    };
    // splice old book data out, put newBookData in.
    booksData.splice(
      booksData.findIndex((book) => bookId === book.id),
      1,
      newBookData
    );
    // rewrite books data(books.json) with the updated values.
    writeBooksData(booksData);

    // send success message
    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  }
};
