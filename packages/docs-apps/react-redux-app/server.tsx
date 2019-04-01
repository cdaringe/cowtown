require('perish')
import { ConnectedApp, createAppStore } from './app'
import { createMiddleware } from 'koa-parcel-middleware'
import { promises as fs } from 'fs'
import * as path from 'path'
import * as ReactDOMServer from 'react-dom/server'
import Bundler from 'parcel-bundler'
import CombinedStream from 'combined-stream'
import Koa from 'koa'
import serveStatic from 'koa-static'

const ENTRY_FILENAME = path.resolve(__dirname, 'index.html')

async function start () {
  const outFile = path.resolve(__dirname, 'dist', 'index.html')
  const app = new Koa()
  const outDir = path.resolve(__dirname, 'dist')
  // create a ui application bundler
  const options = {
    outDir,
    outFile,
    watch: process.env.NODE_ENV === 'development',
    minify: process.env.NODE_ENV !== 'development',
    scopeHoist: false,
    hmr: process.env.NODE_ENV === 'development',
    detailedReport: false
  }
  const bundler = new Bundler(ENTRY_FILENAME, options)
  bundler.bundle()
  const staticMiddleware = serveStatic(outDir)
  const isomorphicRenderMiddleware = createMiddleware({
    bundler,
    renderHtmlMiddleware: async (ctx, next) => {
      // parcel has already compiled our app now, and has
      // a fancy _proper_ html entrypoint at outFile, which has all of our original
      // html + comments, but modified to point to built assets (e.g. js files,
      // versus tsx files). serve that html asset, with redux state _and_
      // a stringified react => html tree!
      const outFileBuffer = await fs.readFile(outFile)
      const [preHeadClose, postHeadClose] = outFileBuffer
        .toString()
        .split(/<!--.*head-content.*-->/)
      const [preAppEntry, postAppEntry] = postHeadClose.split(
        /<!--.*ssr-content.*-->/
      )
      ctx.status = 200
      const htmlStream = new CombinedStream()
      const initialState = { count: 99 } // you'd probably do something more interesting here
        // stream the build html file, but with react/redux data spliced in
      ;[
        preHeadClose,
        // send the initial state date to the browser, so it can use it for hydration
        `<script>window.INITIAL_STATE = ${JSON.stringify(
          initialState
        )}</script>`,
        preAppEntry,
        // render react's html using our desired initial state
        ReactDOMServer.renderToNodeStream(
          ConnectedApp({ store: createAppStore(initialState) })
        ),
        postAppEntry
      ].map(content => htmlStream.append(content))
      ctx.body = htmlStream
      ctx.type = 'html'
      await next()
    },
    staticMiddleware
  })
  app.use((ctx, next) => {
    return isomorphicRenderMiddleware(ctx, next)
  })
  app.listen(3000)
}
start()
