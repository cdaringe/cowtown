require('perish')
import Koa from 'koa'
import Bundler from 'parcel-bundler'
import * as path from 'path'
// import * as React from 'react'
// import { ConnectedApp } from './app'
// import { createMiddleware as ssr } from 'cowtown-ssr-react'

const ENTRY_FILENAME = path.resolve(__dirname, 'index.html')

async function start () {
  const options = {
    outDir: path.resolve(__dirname, 'dist'),
    outFile: path.resolve(__dirname, 'dist', 'index.html'),
    publicUrl: './',
    watch: true,
    minify: false,
    scopeHoist: false,
    hmr: false,
    detailedReport: false
  }
  const app = new Koa()
  const bundler = new Bundler(ENTRY_FILENAME, options)
  const bundlerMw = bundler.middleware()
  app.use((ctx, next) => {
    return bundlerMw(ctx.req as any, ctx.res as any, next)
  })
  // app.use(ssr({
  //   render: () => (
  //     <React.Fragment>
  //       <ConnectedApp />
  //       <script src='http://localhost:1234'></script>
  //     </React.Fragment>
  //   )
  // }))
  app.listen(3000)
}
start()
