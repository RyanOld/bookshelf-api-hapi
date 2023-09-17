import type { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import type { BookRequest } from "../types";

export const bookWrite = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  // check for request params : match exactly with object type.
  try {
    const book = request.payload as BookRequest;
    console.log(book);
  } catch (error) {
    // if an error is catched, send back error as response.
    if (error instanceof Error) {
      return h.response(error);
    }
  }

  // if all checks passed, append book data to json.

  return h.response("hola");
};
