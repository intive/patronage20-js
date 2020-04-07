const path = require('path')

module.exports = function ({ port }) {
  const app = require('fastify')({ logger: true })
  const serveStatic = require('serve-static')

  app.register(require('./plugins/env'))
  app.register(require('./plugins/cookies-authentication'))

  app.use('/', serveStatic(path.join(__dirname, '..', 'frontend', 'dist')))

  app
    .register(require('./plugins/schemas'))
    .register((instance, opts, next) => {
      instance.register(require('fastify-swagger'), {
        mode: 'static',
        routePrefix: '/documentation',
        specification: {
          path: './src/docs/openapi.json',
          baseDir: path.join(__dirname, 'docs')
        },
        exposeRoute: true
      })
        .ready(err => {
          if (err) throw err
          instance.swagger()
        })

      instance.register(require('./routes/well-known/health-check'))

      next()
    },
    {
      prefix: '.well-known'
    })

  app
    .register(require('./routes/dashboard'), {
      prefix: '/api/v1/dashboard'
    })

  app.register(require('./routes/authors'), {
    prefix: '/api/v1/authors'
  })

  app.register(require('./routes/catch-all/catch-all-api-404'), {
    prefix: '/api'
  })

  app.register(require('./routes/catch-all/catch-all'))

  return app
}
