const authors = require('../../Authors.json')

module.exports = function (instance, opts, next) {
  instance.get('/', async (request, reply) => {
    await reply.code(200).header('Content-Type', 'application/json').send(authors)
  })

  instance.get(':id', async (request, reply) => {
    const author = authors.filter(a => a.id == request.params.id)
    if (author.length == 1) {
      reply.code(200).header('Content-Type', 'application/json').send(author)
    } else {
      reply.code(404).header('Content-Type', 'application/json').send({ msg: 'Author with id ' + request.params.id + ' not found.' })
    }
  }
  )

  next()
}
