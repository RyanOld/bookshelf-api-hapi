import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookRequest, BookStorage } from "../types";
import { nanoid } from "nanoid";
import * as fs from "fs";

export const addBook = async (
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
  // TODO : find a way to typecheck the response payload.

  // generate book id and date added.
  const bookId = nanoid(16);
  const dateAdded = new Date().toISOString();
  // create book data with added id and date added.
  const newBook: BookStorage = {
    bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: false,
    reading,
    insertedAt: dateAdded,
    updatedAt: dateAdded,
  };
  console.log(newBook);

  // file operation : read current json, append, and rewrite file.
  // read
  const dataPath = "src/books.json";
  const booksData = fs.readFileSync(dataPath, "utf-8");
  console.log(booksData);
  // append
  const parsedBooks = JSON.parse(booksData) as BookStorage[];
  const newBooks = parsedBooks.concat([newBook]);
  console.log(newBooks);
  // rewrite
  fs.writeFileSync(dataPath, JSON.stringify(newBooks));

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: newBook,
    })
    .code(201);
};
