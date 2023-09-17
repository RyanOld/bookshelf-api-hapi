import Hapi from "@hapi/hapi";
import { routes } from "./routes";

const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  // set routes from ./src/routes.ts
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

void init();
