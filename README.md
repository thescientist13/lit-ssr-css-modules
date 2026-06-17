# lit-ssr-css-modules

A demonstration repo of Lit+SSR with CSS Module scripts and Constructable Stylesheets

## Setup

1. Clone the repo
1. Assumes Node >= 22.x (`nvm use`)
1. Assumes PNPM (`pnpm i`)

## Demos

The demo simply renders the standard Greeting component from the docs using Lit's SSR package and outputs its contents to _./public/index.html_.

### Node Loader

```sh
$ pnpm run build:import
```

### Register Hook

```sh
$ pnpm run build:register
```

## Known Issues

### ✅ `CSSStyleSheet` is not defined

> _Resolved as of [@lit-labs/ssr-dom-shim 1.6.0 release](https://github.com/lit/lit/releases/tag/%40lit-labs%2Fssr-dom-shim%401.6.0)_

When trying to use a Constructable Stylesheet during SSR
```js
import sheet from './greeting.css' with { type: 'css' }
```

this error will occur
```sh
SSR Stylesheet detected...
file:///Users/owenbuckley/Workspace/github/lit-ssr-css-modules/components/greeting/greeting.css:2
        const sheet = new CSSStyleSheet();sheet.replaceSync(`p { 
                      ^

ReferenceError: CSSStyleSheet is not defined
    at file:///Users/owenbuckley/Workspace/github/lit-ssr-css-modules/components/greeting/greeting.css:2:23
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
    at async file:///Users/owenbuckley/Workspace/github/lit-ssr-css-modules/register.js:5:1
```

### ✅ Missing SSR Styles

> _Resolved by applying [this change](https://github.com/thescientist13/lit-ssr-css-modules/pull/3)_

When comparing the output of the two examples, the register hook version has no CSS in the generated `<style>` tag, while the import / loader version does.

#### Loader

```sh
➜  lit-ssr-css-modules git:(master) ✗ pnpm run build:import  

> lit-ssr-css-modules@1.0.0 build:import /Users/owenbuckley/Workspace/github/lit-ssr-css-modules
> node --import @lit-labs/ssr-dom-shim/register-css-hook.js node-loader.js

{
  greetingHtml: '<!--lit-part KzVjSUnXZR0=-->\n' +
    '  <simple-greeting><template shadowroot="open" shadowrootmode="open"><style>p { \n' +
    '  color: blue;\n' +
    '}</style><!--lit-part EvGichL14uw=--><p>Hello, <!--lit-part-->World<!--/lit-part-->!</p><!--/lit-part--></template></simple-greeting>\n' +
    '  <simple-greeting  name="SSR"><template shadowroot="open" shadowrootmode="open"><style>p { \n' +
    '  color: blue;\n' +
    '}</style><!--lit-part EvGichL14uw=--><p>Hello, <!--lit-part-->SSR<!--/lit-part-->!</p><!--/lit-part--></template></simple-greeting>\n' +
    '<!--/lit-part-->'
}
```

#### Register

```sh
➜  lit-ssr-css-modules git:(master) ✗ pnpm run build:register

> lit-ssr-css-modules@1.0.0 build:register /Users/owenbuckley/Workspace/github/lit-ssr-css-modules
> node register-hook.js

{
  greetingHtml: '<!--lit-part KzVjSUnXZR0=-->\n' +
    '  <simple-greeting><template shadowroot="open" shadowrootmode="open"><style></style><!--lit-part EvGichL14uw=--><p>Hello, <!--lit-part-->World<!--/lit-part-->!</p><!--/lit-part--></template></simple-greeting>\n' +
    '  <simple-greeting  name="SSR"><template shadowroot="open" shadowrootmode="open"><style></style><!--lit-part EvGichL14uw=--><p>Hello, <!--lit-part-->SSR<!--/lit-part-->!</p><!--/lit-part--></template></simple-greeting>\n' +
    '<!--/lit-part-->'
}
```