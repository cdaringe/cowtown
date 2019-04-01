# cowtown

a cookbook :book: for pragmatic server-side application development via middleware-pipelines.

cowtown covers many _howto_s of a wide range of application concerns. it demonstrates fulfillment of those concerns via [koa](https://koajs.com).

cowtown is generally _not_ software--it is mainly documentation, covering how to effectively use the abundance of existing software.  in some cases,
cowtown ships a minimal amount of code to support some common use cases.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/cowtown.svg)](https://greenkeeper.io/) [![CircleCI](https://circleci.com/gh/cdaringe/cowtown.svg?style=svg)](https://circleci.com/gh/cdaringe/cowtown) [![TypeScript package](https://img.shields.io/badge/typings-included-blue.svg)](https://www.typescriptlang.org)

## target audience

all interested parties.

## goals

- documentation. share patterns and codified implementations for common application concerns
- encourage server development that rewards:
    - simplicity over ease
        - ease is _not_ a goal.  we think development using these strategies will be easy, but it's important to acknowledge that easy things are often complicated.  seeing how this software works (and its peer packages) should be easy to see, easy to debug, and easy to learn.
    - composition and flat-as-possible project dependency trees
        - share community modules, whilst avoiding deeply nested hard-to-[configure|debug|reason-about] middleware packages
