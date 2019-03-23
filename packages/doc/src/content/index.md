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

:cow: cowtown is about delivering value.  cowtown is not about code--it's about enabling value streams through code, ideally via functional composition.

cowtown is not a framework.  quite the opposite--this project aims to show you how
accessible powerful middlewares are, how easy they are to link together, and how
deep understanding and simplicity can be achieved in a server-side web program when
using a select few tools strategically.

cowtown delivers value through [koa](https://koajs.com).  koa does little on its own,
making its docs short and sweet.  even though koa is not batteries included
(i.e. it does little for you on its own), koa does offer a wonderful
request/response context object, which we will use heavily.

graze the koa docs, then come back for some pragmatic, hands-on examples.

# goals

the following sections describe how to do useful things with koa.

- we will explore usages of individual middlewares
- we will explore useful trees of middlewares
- we will explore some full-stack, e2e middleware recipes

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
we also use [yarn](https://yarnpkg.com), but feel free to use the package
manager of your choice (`npm` is bundled with nodejs).

# create a piece of middleware

> let's start with a loose type definition

```typescript
type Middleware<T> =
  (context: T, next: () => Promise<any>) => any;

// don't know typescript?  dont sweat it.
// this statment says that a middleware is a function
// that takes two arguments--a context,
// and another function called `next`
```

> a koa middleware is just function! let's make one.

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
// ...
const requestCounter: Middleware = async (ctx, next) => {
  await next()
  ++ctx.serialExample.requestCount
  console.log(`request #${ctx.serialExample.requestCount}\n`)
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
when a middleware calls `next()`, koa calls the next middleware downsteam, even if there are none available.

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
puts various request/response properies right on the `ctx` object.  we could have
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

> create some application configuration

```typescript
import dotenv '
```

there are millions of ways to manage configuration.  we generally recommend
conforming to [12f](https://12factor.net) recommendations. however, rather
than putting environment variable checks all over your code, prefer a pure and more
testable strategy, which has you create a configuration container and pass minimal config down to those who require it.


# gracefully update configuration

# upload files

# serve static files

# serve api and web application

# performance - reject requests when overloaded

add [koa-toobusy](https://github.com/nswbmw/koa-toobusy) early in your middleware
stack.

# recipes

<a id="recipes" />

weee

