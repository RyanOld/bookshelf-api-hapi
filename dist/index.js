"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_hapi = __toESM(require("@hapi/hapi"));

// src/handler/addBook.ts
var fs = __toESM(require("fs"));
var import_nanoid = require("nanoid");
var addBook = async (request, h) => {
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    } = request.payload;
    const bookId = (0, import_nanoid.nanoid)(16);
    const dateAdded = (/* @__PURE__ */ new Date()).toISOString();
    const addedBook = {
      id: bookId,
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
      updatedAt: dateAdded
    };
    const newBooks = JSON.parse(
      fs.readFileSync("src/books.json", "utf-8")
    ).push(addedBook);
    fs.writeFileSync("src/books.json", JSON.stringify(newBooks));
  } catch (error) {
    if (error instanceof Error) {
      return h.response(error);
    }
  }
  return h.response("all okay");
};

// src/routes.ts
var routes = [
  // Kriteria 3 : API dapat menyimpan buku
  {
    method: "POST",
    path: "/books",
    handler: addBook
  },
  // Kriteria 4 : API dapat menampilkan seluruh buku
  {
    method: "GET",
    path: "/books",
    handler: (request, h) => {
      return "Hello World!";
    }
  },
  // Kriteria 5 : API dapat menampilkan detail buku
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: (request, h) => {
      return "Book Library Returned.";
    }
  },
  // Kriteria 6 : API dapat mengubah data buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: (request, h) => {
      return "Book Data Modified.";
    }
  },
  // Kriteria 7 : API dapat menghapus buku
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: (request, h) => {
      return "Book Deleted.";
    }
  }
];

// src/index.ts
var init = async () => {
  const server = import_hapi.default.server({
    port: 9e3,
    host: "localhost"
  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
void init();
