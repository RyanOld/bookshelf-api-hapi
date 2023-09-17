import Hapi from "@hapi/hapi";

const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

void init();
