import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { addOneBook } from "./handler/addOneBook";
import { readBooks } from "./handler/readBooks";
import { readOneBook } from "./handler/readOneBook";
import { modifyOneBook } from "./handler/modifyOneBook";

export const routes: ServerRoute[] = [
  // Kriteria 3 : API dapat menyimpan buku
  {
    method: "POST",
    path: "/books",
    handler: addOneBook,
  },
  // Kriteria 4 : API dapat menampilkan seluruh buku
  {
    method: "GET",
    path: "/books",
    handler: readBooks,
  },
  // Kriteria 5 : API dapat menampilkan detail buku
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: readOneBook,
  },
  // Kriteria 6 : API dapat mengubah data buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: modifyOneBook,
  },
  // Kriteria 7 : API dapat menghapus buku
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Book Deleted.";
    },
  },
];
