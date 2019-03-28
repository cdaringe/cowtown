---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - typescript
  # - bash

toc_footers:
  - <a href='#'>Check us out on GitHub</a>

includes:
  - errors

search: true
---

# introduction

![](./cow.png) cowtown is about delivering value.  cowtown is not about code--it's about enabling value streams through code, ideally via functional composition.

cowtown is not a framework.  quite the opposite--this project aims to show you how
existing, accessible, open middlewares can provide unmatched value.  it's about showing
that they are easy to link together, and how deep understanding and simplicity can be
achieved in a server-side web program when using a select few tools strategically.

cowtown delivers value through [koa](https://koajs.com).  koa does little on its own,
making its docs short and sweet.  even though koa is not batteries included
(i.e. it does little for you on its own), koa does offer a wonderful
request/response context object, which i will use heavily.

graze the koa docs, then come back for some pragmatic, hands-on examples.

# goals

the following sections describe how to do useful things with koa.

- i will explore usages of individual middlewares
- i will explore useful trees of middlewares
- i will explore some full-stack, e2e middleware recipes

the following sections are not meant to be read in any particular order.  however,
more complicated topics do trend towards the bottom.

# getting started

> for example:

```bash
$ mkdir /app && cd /app && git init
$ yarn init -y
$ yarn add koa
# optionally, add typescript
$ yarn add --dev typescript @types/koa
$ npx tsc --init
$ touch index.ts
```

start a new project, and install the barebones.

it is assumed that you already have [nodejs](https://nodejs.org) installed.
i also use [yarn](https://yarnpkg.com), but feel free to use the package
manager of your choice (`npm` is bundled with nodejs).

# create a piece of middleware

> a middleware is just function. let's make one.

```typescript
// babys-first-middleware/server.js
const loggerMiddleware: Middleware<any> = async (ctx, next) => {
  console.log('before')
  await next() // runs the next middleware
  console.log('after')
}
// curl localhost:3000 # logs:
// before
// after
```

> typescript buff?

```typescript
type Middleware<T> =
  (context: T, next: () => Promise<any>) => any;

// don't know typescript?  dont sweat it.
// this statment says that a middleware is a function
// that takes two arguments--a context,
// and another function called `next`
```

the koa docs already cover this full well, but it's worth a quick review.
most "work" in koa applications happen in middlewares.  your application exists
to do work, and a request/response `context` flows up and down a stack--or tree--of
middlewares.

they're easy to write, and should be considered often when designing a workflow.

anything passed to `koa.use(...)` is a piece of middleware.

# link middlewares together

> the middleware "stack"

```typescript
// serial-middlewares/server.ts
const requestCounter: Middleware = async (ctx, next) => {
  ++ctx.serialExample.requestCount
  console.log(`request #${ctx.serialExample.requestCount}\n`)
  await next()
}
// ...
  app.context.serialExample = { requestCount: 0 }
  app.use(loggerMiddleware) // see prior example
  app.use(requestCounter)

// $ curl localhost:3000
//   before
//   request #1
//   after
// $ curl localhost:3000
//   before
//   request #2
//   after
```

middlewares get called in the order that they are registered with `app.use(...)`.
when a middleware calls `next()`, koa calls the next middleware downsteam if are any available.

# create a basic server

```typescript
// 404/server.ts
import Koa from 'koa'
async function start () {
  const koa = new Koa()
  koa.listen(3000)
}
start()
// curl localhost:3000 # => 404
```

the following is a minimal koa server.  note that when you stream nothing back
to clients, the default http response is `404`.

# create a hello world server

```typescript
// hello-world/server.ts
import Koa from 'koa'
async function start () {
  const app = new Koa()
  app.use(ctx => {
    ctx.body = 'hello world'
  })
  app.listen(3000)
}
start()
// curl localhost:3000 # => 200 "hello world"
```

let's register a single middleware.  the middleware considers nothing about the
details of your request--it blindly sets `'hello world'` to the body.

# perform dummy routing

you can route manually based on request parameters all you want.  the `ctx`
puts various request/response properies right on the `ctx` object.  i could have
used `ctx.request.path` as well.  `¯\_(ツ)_/¯`.  terse is a-o-k so long as it's clear.
```typescript
// dummy-routing/server.ts
app.use(ctx => {
  if (ctx.path === '/hello' && ctx.method === 'GET') {
    return ctx.body = 'world'
  }
  if (ctx.path === '/beep' && ctx.method === 'POST') {
    console.log('bop')
  }
})
// curl localhost:3000/hello # => 200 "world"
// curl -X POST localhost:3000/beep # logs "bop"
```

# perform basic routing

[koa-router](https://github.com/ZijianHe/koa-router) is the defact router for koa.

define some routes, then use `.routes()` to create a middleware on the router, which
you can then plug into your app.

```typescript
import Router from 'koa-router'
// ...
const app = new Koa()
var router = new Router();
router.get('/hello', ctx => ctx.body = 'world')
router.post('/beep', () => console.log('bop'))
app.use(router.routes())
// curl localhost:3000/hello # => "world"
// curl -X POST localhost:3000/beep # => 404, logs "bop"
app.listen(3000)
```

# manage configuration

> create application config, pass it in

```typescript
// application-config/server.ts
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


// application-config/config.ts
import joi from 'joi'

type Config = {
  port: number
  logLevel: 'debug' | 'info' | 'warn' | 'error' | 'silent'
}

export const fromEnv: () => Partial<Config> = () => {
  const partialConfig: Partial<Config> = {};
  if (process.env.PORT) partialConfig.port = parseInt(process.env.PORT)
  if (process.env.LOG_LEVEL) partialConfig.logLevel = process.env.LOG_LEVEL as any
  return partialConfig
}

// GOOD
export const create: (partial?: Partial<Config>) => Config = (partial = {}) => {
  // create a complete configuration container, provide universally applicable
  // defaults
  const { port, logLevel } = partial
  const config: Config = {
    port: port || 8080,
    logLevel: logLevel || 'warn'
  }
  validate(config)
  return config
}

export const validate = (config: Config) => {
  const res = joi.validate(config, {
    port: joi.number().min(0),
    logLevel: joi.any().valid('debug', 'info', 'warn', 'error', 'silent')
  }, { presence: 'required' })
  if (res.error) throw res.error
  return config
}

// BAD
// export const config = fromEnv() // not extensible in testing
// export const config = create(fromEnv()) // not extensible in testing


// examples:

// defaults only
// $ node application-config/server
//   { config: { port: 8080, logLevel: 'warn' } }

// custom port
// $ PORT=3333 node application-config/server
//   { config: { port: 3333, logLevel: 'warn' } }

// [invalid] custom log level
// $ LOG_LEVEL='bad-level' node application-config/server
//   ValidationError: child "logLevel" fails because ["logLevel" must be one of
//     [debug, info, ... ]]
```

there are millions of ways to manage configuration.  i generally recommend
conforming to [12 factor](https://12factor.net/config) recommendations. however, rather
than putting environment variable checks all over your code, prefer a pure and
testable strategy.

* create a configuration data-structure on boot
* inject configuration into your application as needed.
* attempt to keep your configuration consolidated/centralized
* attempt to keep your configuration immutable/read-only
* validate configuration (i.e. user input) each time it is created/modified

when configuration is managed as suggested, you will not need advanced or
complicated local testing strategies.  simply create cofiguration (or any resource, really) then pass the resource into modules being tested.


# gracefully update configuration

if your application has requests inflight, swapping shared, mutable configuration whilst
outstanding handlers are in proccess may introduce nondeteriminstic or fatal behavior.

if your application needs to swap config at runtime, try to handling these changes
gracefully.  i recommend either:

- gracefully restarting the server on receipt of new configuration, or
- maintaining a stack of immutable configs, only of which one is attached to a request through its lifecycle

in the latter option, when an older configuration object is no longer consumed by any outstanding requests,
it can be `shift`ed off of the stack.  the later options also assumes that middlewares
can suffice using configuration off of the request context alone.  if this is not the
case, fall back to the first option.

# upload files

there's a [middleware](https://github.com/koa-modules/multer) for that.

# serve static files

there's a [middleware](https://github.com/koajs/static) for that.

# serve an api and a web application

> api + static server

```typescript
// api-and-static/server.ts
import mount from 'koa-mount'
import serve = require('koa-static')
// ...

const app = new Koa()
const fileserver = new Koa()
fileserver.use(serve(PUBLIC_DIRNAME))
const api = new Koa()
api.use(ctx => { ctx.body = { ok: true }})
app.use(mount('/api', api))
app.use(mount('/', fileserver))
app.listen(3000)

// $ curl localhost:3000
// <html>
//   <h1>ahoy, matees</h1>
// </html>

// $ curl localhost:3000/kittens/talk.txt
// meow # served straight from disk!

// $ curl localhost:3000/api
// { "ok": true }
```

it's commonplace to serve web assets from a fast fileserver, e.g. nginx, and a
supporting api from another.  this isn't always the case, however.  it can be
convenient to ship only one executable to provide both value streams.

# isomorphic rendering


# performance - reject requests when overloaded

add [koa-toobusy](https://github.com/nswbmw/koa-toobusy) early in your middleware
stack.

# recipes

<a id="recipes" />

weee

