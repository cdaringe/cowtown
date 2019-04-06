(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./src/create-a-middleware.mdx":function(e,a,n){"use strict";n.r(a),n.d(a,"default",function(){return i});var t=n("../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=n("../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),r=n("../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),s=n("../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),l=n("../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),m=n("../../node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),c=n("../../node_modules/react/index.js"),p=n.n(c),d=n("../../node_modules/@mdx-js/tag/dist/index.js"),i=function(e){function a(e){var n;return Object(o.a)(this,a),(n=Object(s.a)(this,Object(l.a)(a).call(this,e))).layout=null,n}return Object(m.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){var e=this.props,a=e.components;Object(t.a)(e,["components"]);return p.a.createElement(d.MDXTag,{name:"wrapper",components:a},p.a.createElement(d.MDXTag,{name:"h1",components:a,props:{id:"create-a-piece-of-middleware"}},"create a piece of middleware"),p.a.createElement(d.MDXTag,{name:"p",components:a},'the koa docs already cover this full well, but it\'s worth a quick review.\nmost "work" in koa applications happen in middlewares.  your application exists\nto do work, and a request/response ',p.a.createElement(d.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"context")," flows up and down a stack--or tree--of\nmiddlewares."),p.a.createElement(d.MDXTag,{name:"p",components:a},"they're easy to write, and should be considered often when designing a workflow."),p.a.createElement(d.MDXTag,{name:"p",components:a},"anything passed to ",p.a.createElement(d.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"koa.use(...)")," is a piece of middleware."),p.a.createElement(d.MDXTag,{name:"blockquote",components:a},p.a.createElement(d.MDXTag,{name:"p",components:a,parentName:"blockquote"},"a middleware is just function. let's make one.")),p.a.createElement(d.MDXTag,{name:"pre",components:a},p.a.createElement(d.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"language-typescript"}},"// babys-first-middleware/server.js\nconst loggerMiddleware: Middleware<any> = async (ctx, next) => {\n  console.log('before')\n  await next() // runs the next middleware\n  console.log('after')\n}\n// curl localhost:3000 # logs:\n// before\n// after\n")),p.a.createElement(d.MDXTag,{name:"blockquote",components:a},p.a.createElement(d.MDXTag,{name:"p",components:a,parentName:"blockquote"},"typescript buff?")),p.a.createElement(d.MDXTag,{name:"pre",components:a},p.a.createElement(d.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"language-typescript"}},"type Middleware<T> =\n  (context: T, next: () => Promise<any>) => any;\n\n// don't know typescript?  dont sweat it.\n// this statment says that a middleware is a function\n// that takes two arguments--a context,\n// and another function called `next`\n")))}}]),a}(p.a.Component);"undefined"!==typeof i&&i&&i===Object(i)&&Object.defineProperty(i,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/create-a-middleware.mdx"}}),"undefined"!==typeof i&&i&&i===Object(i)&&Object.defineProperty(i,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/create-a-middleware.mdx"}}),i.isMDXComponent=!0}}]);
//# sourceMappingURL=src-create-a-middleware.626372f526a4bd2dcbc8.js.map