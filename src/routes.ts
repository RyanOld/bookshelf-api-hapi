import type { ServerRoute } from "@hapi/hapi";
import { addOneBook } from "./handler/addOneBook";
import { getBooks } from "./handler/getBooks";
import { getBookWithId } from "./handler/getBookWithId";
import { modifyBookWithId } from "./handler/modifyBookWithId";
import { deleteBookWithId } from "./handler/deleteBookWithId";

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
    handler: getBooks,
  },
  // Kriteria 5 : API dapat menampilkan detail buku
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookWithId,
  },
  // Kriteria 6 : API dapat mengubah data buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: modifyBookWithId,
  },
  // Kriteria 7 : API dapat menghapus buku
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookWithId,
  },
];
