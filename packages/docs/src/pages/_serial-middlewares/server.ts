import Koa, { Middleware } from 'koa'

const loggerMiddleware: Middleware = async (ctx, next) => {
  console.log('before')
  await next() // runs the next middleware
  console.log('after')
}

const requestCounter: Middleware = async (ctx, next) => {
  await next()
  ++ctx.serialExample.requestCount
  console.log(`request #${ctx.serialExample.requestCount}`)
}

async function start () {
  const app = new Koa()
  app.context.serialExample = { requestCount: 0 }
  app.use(loggerMiddleware)
  app.use(requestCounter)
  app.listen(3000)
}
start()
