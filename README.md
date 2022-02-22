# @mpnpm-demo

I wanted to create a simple mithril.js app but then was heavily influenced by [@mpnpm](https://github.com/panoply/mithril-pnpm) and I wanted to use Miniflare and integration tests.

### How to run?

```cli
pnpm i
```

You can then cd into different packages (mainly `api` and `app`). While you can execute commands from root, it is just best to `cd` into the directories you are working within. Look at [pnpm filtering](https://pnpm.io/filtering) to understand and better leverage workspace executions from different locations.

## Commands

Every package has the following commands:

```cli
pnpm dev      Starts development in watch mode
pnpm build    Runs a production build
```

## `/build`

This directory contains build specific packages, they are:

#### @mpnpm/tsconfig

This is a shareable `tsconfig.json` that each package that is TypeScript based can extend upon. It includes just some basic defaults.

#### @mpnpm/prettier-config

This is a shareable Prettier config. Extend configuration from within `package.json` files, eg:

```json
{
  "prettier": "@mpnpm/prettier-config"
}
```

## `/packages`

This directory contains non-build specific packages, those which would be a library, application, module or something else. Contained within this example is the following:

#### @mpnpm/api

This is a simple Cloudflare Worker generated from the TypeScript template

#### @mpnpm/app

This is a basic mithril app that uses `@mpnpm/api` and is bundling using Rollup and TypeScript. It demonstrates a private package using workspace packages.