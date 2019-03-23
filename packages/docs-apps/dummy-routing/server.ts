import Koa from 'koa'
async function start () {
  const app = new Koa()
  app.use(ctx => {
    if (ctx.path === '/hello' && ctx.method === 'GET') {
      return ctx.body = 'world'
    }
    if (ctx.path === '/beep' && ctx.method === 'POST') {
      console.log('bop')
    }
  })
  // curl localhost:3000/hello # => "world"
  // curl -X POST localhost:3000/beep # logs "bop"
  app.listen(3000)
}
start()
