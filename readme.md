# cowtown

koajs and friends, with a few optional, prebaked middleware-pipelines

**cowtown is just an experiement** - do not use

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/cowtown.svg)](https://greenkeeper.io/) [![CircleCI](https://circleci.com/gh/cdaringe/cowtown.svg?style=svg)](https://circleci.com/gh/cdaringe/cowtown) [![TypeScript package](https://img.shields.io/badge/typings-included-blue.svg)](https://www.typescriptlang.org)

## why not just koa?

please, by all my means, use _just koa_. however, if you orchestrate a myriad of services with similar middleware flows, it's convenient to version a few said pipes for plug-n-play ability.

we strive to make as many small pieces of the middlewares tunable via function
arguments, whilst still offering a decent off-the-shelf experience.

## target audience

teams who want to share some common functionality

## goals

- **simple** over **easy**
  - pure ease is _not_ a goal.  we think it will be easy, but it's important to acknowledge that easy things are often complicated.  seeing how this software works (and its peer packages) should be easy to see, easy to debug, and easy to
  learn.

## provisions

- DOCS
- ssr react
  - hot reloading
- api clients convention
  - server side clients
  - client side ...clients
- KV
- security middlewares
