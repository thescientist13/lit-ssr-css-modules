# lit-ssr-css-modules

A demonstration repo of Lit+SSR with CSS Module scripts and Constructable Stylesheets

## Setup

1. Clone the repo
1. Assumes Node >= 22.x (`nvm use`)
1. Assumes PNPM (`pnpm i`)

## Demo

The demo simply renders the standard Greeting component from the docs using Lit's SSR package and outputs its contents to _./public/index.html_.

```sh
$ pnpm run build
```

## Known Issues

### `CSSStyleSheet` is not defined

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