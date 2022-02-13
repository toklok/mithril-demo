import dotenv from 'dotenv'
dotenv.config()

import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    exports: 'named',
    format: 'es',
    file: 'dist/index.mjs',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    nodeResolve({ browser: true }),
    replace({
      preventAssignment: false,
      'process.env.DARKSKY_API_KEY': JSON.stringify(
        process.env.DARKSKY_API_KEY,
      ),
    }),
    typescript({outputToFilesystem: true}),
    terser(),
  ],
}
