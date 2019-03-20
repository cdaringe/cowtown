import * as React from "react"
import * as ReactDOMServer from 'react-dom/server'
import Koa from 'koa'

export interface SsrReactOpts {
  render: <P = {}> (ctx: Koa.Context) => Promise<React.ReactElement<P>>
}

export function createMiddleware (opts: SsrReactOpts) {
  return async function renderDomMiddleware (ctx, next) {
    await next()
    ctx.type = 'html'
    const component = await opts.render(ctx)
    ctx.body = ReactDOMServer.renderToNodeStream(component)
  } as Koa.Middleware
}
