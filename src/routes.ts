import type { ServerRoute } from "@hapi/hapi";
import { addOneBook } from "./handler/addOneBook";
import { readBooks } from "./handler/readBooks";
import { readOneBook } from "./handler/readOneBook";
import { modifyOneBook } from "./handler/modifyOneBook";
import { deleteOneBook } from "./handler/deleteOneBook";

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

  // Kriteria OPSIONAL :
  // Kriteria Opsional 1 & 2 : Get all "reading"/"unreading" books.
  {
    method: "GET",
    path: "/books?reading={reading}",
    handler: getReadingBooks,
  },
  // Kriteria Opsional 3 & 4 : Get all "finished"/"Unfinished" books.
  {
    method: "GET",
    path: "/books?finished={finished}",
    handler: getFinishedBooks,
  },
  // Kriteria Opsional 5 : Get all books that contains "Dicoding" in its name.
  {
    method: "GET",
    path: "/books?name={name}",
    handler: getBooksWithName,
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
    handler: deleteOneBook,
  },
];
