import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookStorage } from "../types";
import { getBooksData } from "./dataManager";

export const readOneBook = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | undefined> => {
  // input checks :
  const { bookId } = request.params;
  const booksData = JSON.parse(getBooksData()) as BookStorage[];
  // console.log(booksData);

  for (let i = 0; i < booksData.length; i++) {
    // if matching book id is found, return success response w/ book data.
    console.log(bookId === booksData[i].id);
    if (booksData[i].id === bookId) {
      // TODO : destructure-restructure to cnage bookId prop to id.
      // const {bookId, } = booksData[i]
      return h
        .response({
          status: "success",
          data: {
            book: booksData[i],
          },
        })
        .code(200);
    }
  }

  // if matching book id is not found from forEach iterations, return 404.
  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
};
