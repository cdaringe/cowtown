require('perish')
import mount from 'koa-mount'
import * as path from 'path'
import Koa from 'koa'
import serve = require('koa-static')

const PUBLIC_DIRNAME = path.resolve(__dirname, 'public')

async function start () {
  const app = new Koa()
  const fileserver = new Koa()
  fileserver.use(serve(PUBLIC_DIRNAME))
  const api = new Koa()
  api.use(ctx => {
    ctx.body = { ok: true }
  })
  app.use(mount('/api', api))
  app.use(mount('/', fileserver))
  app.listen(3000)

  // $ curl localhost:3000
  // <html>
  //   <h1>ahoy, matees</h1>
  // </html>

  // $ curl localhost:3000/kittens/talk.txt
  // meow

  // $ curl localhost:3000/api
  // { "ok": true }
}
start()
