import Hapi from "@hapi/hapi";
import { routes } from "./routes";
import { resetBooksData } from "./handler/utils/dataManager";

const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  // set routes from ./src/routes.ts
  server.route(routes);

  // reset books data(books.json) on startup
  resetBooksData();

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

void init();
