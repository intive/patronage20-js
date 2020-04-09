const axios = require('axios')
const helpers = require('../plugins/db/helpers.js')
const schema = {
  schema: {
    response: {
      200: {
        $ref: 'dashboard-get-200.json'
      }
    }
  }
}

const dashboard = async function (fastify, options, next) {
  fastify.get('/', schema, async (request, reply) => {
    const gatewayUrl = fastify.config.GATEWAY_URL
    const gatewayResponse = await axios.get(`${gatewayUrl}/dashboard`)
    const res = await fastify.db.getAllSensors(fastify.mongo.db)
    let data = await helpers.changeID(gatewayResponse.data)
    data = await helpers.joinSensors(data, res)
    reply.code(200).send(data)
  })

  fastify.get('/delete', async function (req, reply) {
    const res = await this.db.removeAllSensors(this.mongo.db)
    reply.code(200).send(res)
  })

  next()
}

module.exports = dashboard
