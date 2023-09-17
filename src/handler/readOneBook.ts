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

  booksData.forEach((book) => {
    // if matching book id is found, return success response w/ book data.
    console.log(bookId === book.bookId);
    // TODO : WARNING : FLAKY TEST. bookId is randomly generated. no guarantee it will match.
    if (book.bookId === bookId) {
      const responseData = {
        status: "success",
        data: {
          book,
        },
      };
      console.log(responseData);
      return h.response(responseData).code(200);
    }
  });

  // if matching book id is not found from forEach iterations, return 404.
  return h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
};
