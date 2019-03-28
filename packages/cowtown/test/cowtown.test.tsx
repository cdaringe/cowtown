import { createMiddleware as ssr } from 'cowtown-ssr-react'
import { TestHeader } from './ssr/TestHeader'
import { Server } from 'http'
import * as React from 'react'
import ava, { TestInterface } from 'ava'
import fetch from 'node-fetch'
import getPort from 'get-port'
import Koa from 'koa'
import { App } from './ssr/AppWithRouting'
import { StaticRouter, StaticRouterContext } from 'react-router'

const test = ava as TestInterface<{
  port: number
  koa: Koa
  server?: Server
}>

test.beforeEach(async t => {
  t.context.port = await getPort()
  t.context.koa = new Koa()
})

test.afterEach(({ context: { server } }) => {
  server && server.close()
})

test('ssr - basic', async t => {
  const { koa, port } = t.context
  koa.use(ssr({ render: async ctx => <TestHeader children={ctx.path} /> }))
  const server = koa.listen(port)
  const text = await fetch(`http://localhost:${port}`).then(res => res.text())
  t.is(text, '<h1 data-reactroot="">/</h1>')
  server.close()
})

test('ssr - with routes', async t => {
  const { koa, port } = t.context
  const routerContext: StaticRouterContext = {}
  koa.use(
    ssr({
      render: async ctx => (
        <StaticRouter
          location={ctx.url}
          context={routerContext}
          children={<App children={ctx.path} />}
        />
      )
    })
  )
  const server = koa.listen(port)
  const [textOverview, textDetail] = await Promise.all([
    fetch(`http://localhost:${port}/dashboard/overview`).then(res =>
      res.text()
    ),
    fetch(`http://localhost:${port}/dashboard/detail`).then(res => res.text())
  ])
  t.is(textOverview, '<div><h1>dashboard</h1><h2>overview</h2></div>')
  t.is(textDetail, '<div><h1>dashboard</h1><h2>detail</h2></div>')
  server.close()
})
