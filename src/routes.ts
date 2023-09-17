import type { ReqRef, ResponseToolkit } from "@hapi/hapi";

export const routes = [
  {
    method: "GET",
    path: "/books",
    handler: (request: ReqRef, h: ResponseToolkit) => {
      return "Hello World!";
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: (request: ReqRef, h: ResponseToolkit) => {
      return "Book Added.";
    },
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: (request: ReqRef, h: ResponseToolkit) => {
      return "Book Library Returned.";
    },
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: (request: ReqRef, h: ResponseToolkit) => {
      return "Book Data Modified.";
    },
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: (request: ReqRef, h: ResponseToolkit) => {
      return "Book Deleted.";
    },
  },
];
