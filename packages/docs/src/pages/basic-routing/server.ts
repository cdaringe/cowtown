import Koa from 'koa'
import Router from 'koa-router'
async function start () {
  const app = new Koa()
  var router = new Router()
  router.get('/hello', ctx => (ctx.body = 'world'))
  router.post('/beep', ctx => {
    console.log('bop')
    ctx.body = 'bop'
  })
  app.use(router.routes())
  // curl <origin>/hello # => "world"
  // curl -X POST <origin>/beep # => 404, logs "bop"
  app.listen(3000)
}
start()
