const Hapi = require('@hapi/hapi');
const bookshelfRoute = require('./routes/bookshelfRoutes');
const init = async () => {
  const server = Hapi.server({
    port: 9000, // using port 8080 ;
    host: 'localhost',
  });

  server.route(bookshelfRoute);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
