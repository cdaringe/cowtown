import Koa, { Middleware } from 'koa'

const loggerMiddleware: Middleware = async (ctx, next) => {
  console.log('before')
  await next() // runs the next middleware
  console.log('after')
}

async function start () {
  const app = new Koa()
  app.use(loggerMiddleware)
  app.listen(3000)
}
start()
