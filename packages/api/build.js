import dotenv from 'dotenv'
dotenv.config()

import { build } from 'esbuild'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

const { STRIPE_API_KEY, DARKSKY_API_KEY, FAUNA_SECRET } = process.env

/** @type {build.CommonOptions} */
const options = {
  target: 'esnext',
  sourcemap: false,
  treeShaking: true,
  minifySyntax: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
}

build({
  ...options,
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: 'dist/index.mjs',
  define: {
    'process.env.STRIPE_API_KEY': JSON.stringify(STRIPE_API_KEY),
    'process.env.DARKSKY_API_KEY': JSON.stringify(DARKSKY_API_KEY),
    'process.env.FAUNA_SECRET': JSON.stringify(FAUNA_SECRET),
  },
  plugins: [NodeModulesPolyfillPlugin(), NodeGlobalsPolyfillPlugin()],
}).catch(() => process.exit(1))
