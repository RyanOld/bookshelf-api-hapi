import Hapi from "@hapi/hapi";

const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  // set get route to return "hello world"
  server.route({
    method: "GET",
    path: "/books",
    handler: (request, h) => {
      return "Hello World!";
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

void init();
