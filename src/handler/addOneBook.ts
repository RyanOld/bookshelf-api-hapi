import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookRequest, BookStorage } from "../types";
import { nanoid } from "nanoid";
import { getBooksData, writeBooksData } from "./utils/dataManager";

export const addOneBook = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // destructurize request payload to add id etc for json append.
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
  // Check request before processing :
  // Check 1 : no name param
  if (name === undefined) {
    // return error 400
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  } else if (readPage > pageCount) {
    // check 4 : readpage > pagecount

    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  // generate book id and date added.
  const bookId = nanoid(16);
  const dateAdded = new Date().toISOString();
  // create book data with added id and date added.
  const newBook: BookStorage = {
    id: bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    // set finished = true if readpage === pagecount
    finished: readPage === pageCount,
    reading,
    insertedAt: dateAdded,
    updatedAt: dateAdded,
  };
  // console.log(newBook);

  // file operation : read current json, append, and rewrite file.
  // read
  const booksData = getBooksData();
  // console.log(booksData);

  // append
  const newBooks = booksData.concat([newBook]);
  // console.log(newBooks);

  // rewrite
  writeBooksData(newBooks);

  // return success message.
  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId },
    })
    .code(201);
};
