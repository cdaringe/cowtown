import Koa = require('koa')

const loggerMiddleware: Koa.Middleware = async (ctx, next) => {
  // @warning - the demo output may omit some logs
  console.log('before')
  await next()
  console.log('after')
}

const requestCounter: Koa.Middleware = async (ctx, next) => {
  await next()
  ++ctx.stackDemo.requestCount
  ctx.body = `request #${ctx.stackDemo.requestCount}`
}

async function start () {
  const app = new Koa()
  app.context.stackDemo = { requestCount: 0 }
  app.use(loggerMiddleware)
  app.use(requestCounter)
  app.listen(3000)
}
start()
