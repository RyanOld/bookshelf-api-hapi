import type { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { addBook } from "./handler/addBook";
import { readBooks } from "./handler/readBooks";

export const routes: ServerRoute[] = [
  // Kriteria 3 : API dapat menyimpan buku
  {
    method: "POST",
    path: "/books",
    handler: addBook,
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
    handler: (request: Request, h: ResponseToolkit) => {
      return "Book Library Returned.";
    },
  },
  // Kriteria 6 : API dapat mengubah data buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Book Data Modified.";
    },
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
