import Koa = require('koa')
async function start () {
  const app = new Koa()
  app.use(ctx => {
    ctx.body = 'hello world'
  })
  app.listen(3000)
}
start()
