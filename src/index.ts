import Hapi from "@hapi/hapi";
import { routes } from "./routes";
import { writeFileSync } from "fs";

const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  // set routes from ./src/routes.ts
  server.route(routes);

  // reset books data(books.json)
  writeFileSync("src/books.json", "[]");

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

void init();
