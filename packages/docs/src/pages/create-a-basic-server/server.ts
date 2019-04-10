import Koa from 'koa'

async function start () {
  const koa = new Koa()
  koa.listen(3000)
}

start()
