const authors = require('../public/authors.json');

const routes = async (fastify, options) => {
  fastify.get('/', (request, reply) => {
    reply.send(authors);
  });

  fastify.get('/1', (request, reply) => {
    reply.send(authors[0]);
  });

  fastify.get('/5', (request, reply) => {
    reply.send(authors[5]);
  });
};

module.exports = routes;
