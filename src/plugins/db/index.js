const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost/sensors_data'
const fp = require('fastify-plugin')
const mongo = require('fastify-mongodb')

module.exports = fp(async function (fastify, options, next) {
  fastify.register(mongo, {
    forceClose: true,
    url: 'mongodb://patronage20-js-app:23456y7gtuijdfu8ie3io%23%40%25@ds053539.mlab.com:53539/heroku_4n24t4wx',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  next()
})
