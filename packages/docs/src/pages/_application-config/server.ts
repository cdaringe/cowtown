require('perish')
import { create as createConfig, fromEnv } from './config'

import Koa from 'koa'
async function start () {
  const app = new Koa()
  const config = createConfig(fromEnv())
  // createMiddlewares(config)
  // createServices({ app, config: config.services })
  console.log({ config })
  app.listen(config.port)
}
start()
