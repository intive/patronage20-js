const axios = require('axios')
const { postNewNotifications, filterNewNotifications } = require('../plugins/db/helpers')

const schema = {
  schema: {
    response: {
      200: {
        $ref: 'notifications-get-200.json'
      }
    }
  }
}

const deleteSchema = {
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'number'
        }
      }
    }
  }
}

const notifications = async function (fastify, options, next) {
  fastify.get('/', schema, async function (request, reply) {
    const gatewayUrl = this.config.GATEWAY_URL
    const gatewayResponse = await axios.get(`${gatewayUrl}/notifications`, {
      withCredentials: true,
      headers: {
        Cookie: `${this.config.COOKIE_NAME}=${this.config.COOKIE_VALUE}`
      }
    })

    const res = await this.db.getNotifications(this.mongo.db)
    const filtered = await filterNewNotifications(gatewayResponse.data, res)
    await postNewNotifications(this.db, this.mongo.db, filtered)
    const all = await this.db.getNotifications(this.mongo.db)
    reply.code(200).send(all)
  })

  fastify.delete('/:id', deleteSchema, async function (req, reply) {
    const gatewayUrl = this.config.GATEWAY_URL
    await axios.delete(`${gatewayUrl}/notifications/${req.params.id}`, {
      withCredentials: true,
      headers: {
        Cookie: `${this.config.COOKIE_NAME}=${this.config.COOKIE_VALUE}`
      }
    })
    const res = await this.db.updateNotification(this.mongo.db, parseInt(req.params.id))
    res.result.n === 0
      ? reply.code(400).send(res)
      : reply.code(200).send(res)
  })

  fastify.get('/delete', async function (req, reply) {
    const res = await this.db.deleteNotifications(this.mongo.db)
    reply.code(200).send(res)
  })

  next()
}

module.exports = notifications
