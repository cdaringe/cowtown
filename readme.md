# cowtown

a cookbook for pragmatic server-side application development via middleware-pipelines.

cowtown covers the _howto_ of a wide range of application concerns, and demonstrates fulfillment of those concerns via [koa](https://koajs.com).

cowtown is generally _not_ software--it is a guide on how to effectively use
the abundance of already-existing-and-well-designed software.  in some cases,
cowtown ships a minimal amount of middleware to support some common use cases.

**cowtown is just an experiement** - do not use

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/cowtown.svg)](https://greenkeeper.io/) [![CircleCI](https://circleci.com/gh/cdaringe/cowtown.svg?style=svg)](https://circleci.com/gh/cdaringe/cowtown) [![TypeScript package](https://img.shields.io/badge/typings-included-blue.svg)](https://www.typescriptlang.org)

## why not just koa?

please, by all my means, use _just koa_.  if you orchestrate a myriad of services with similar middleware flows, it may be convenient to version a few common middleware stacks for plug-n-play ability, which can be used in _conjunction_ with koa.

## target audience

all interested parties.

## goals

encourage server develop that rewards:

- **simple** over **easy**
  - pure ease is _not_ a goal.  we think it will be easy, but it's important to acknowledge that easy things are often complicated.  seeing how this software works (and its peer packages) should be easy to see, easy to debug, and easy to
  learn.
- composition and flat-as-possible project dependency trees
  - share community works, whilst avoiding deeply nested hard-to-[configure|debug|reason-about]

## provisions

- DOCS
- ssr react
  - hot reloading
- api clients convention
  - server side clients
  - client side ...clients
- KV
- security middlewares
