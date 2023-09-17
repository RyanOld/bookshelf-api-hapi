import type { Request, ResponseToolkit } from "@hapi/hapi";

export const routes = [
  {
    method: "GET",
    path: "/books",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Hello World!";
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Book Added.";
    },
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Book Library Returned.";
    },
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Book Data Modified.";
    },
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Book Deleted.";
    },
  },
];
