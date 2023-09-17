import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookRequest, BookStorage } from "../types";
import { getBooksData, writeBooksData } from "./dataManager";

export const modifyOneBook = async (
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
    return h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
  } else if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  // read books data
  const booksData = JSON.parse(getBooksData()) as BookStorage[];

  // take matching single book data
  const { bookId } = request.params;
  const matchingBook = booksData.find((book) => {
    return bookId === book.id;
  });

  // return error if book with matching id not found
  if (matchingBook === undefined) {
    return h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
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
    // start remove -> insert -> rewrite operation
    booksData.splice(
      booksData.findIndex((book) => bookId === book.id),
      1,
      newBookData
    );
    // rewrite
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
