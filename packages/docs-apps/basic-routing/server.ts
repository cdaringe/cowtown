import Koa from 'koa'
import Router from 'koa-router'
async function start () {
  const app = new Koa()
  var router = new Router();
  router.get('/hello', ctx => ctx.body = 'world')
  router.post('/beep', () => console.log('bop'))
  app.use(router.routes())
  // curl localhost:3000/hello # => "world"
  // curl -X POST localhost:3000/beep # => 404, logs "bop"
  app.listen(3000)
}
start()
