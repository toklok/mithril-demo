import path from "path";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import sass from "node-sass";
import scss from "rollup-plugin-scss";
import autoprefixer from "autoprefixer";
import css from "rollup-plugin-postcss";
import dev from "rollup-plugin-dev";
import livereload from "rollup-plugin-livereload";
import bundleInject from "rollup-plugin-bundle-inject";

const projectRootDir = path.resolve(__dirname);

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  treeshake: true,
  output: [
    {
      dir: 'public',
      format: "es",
      sourcemap: false,
      preferConst: true,
      plugins: [
        bundleInject({
          // specify the template
          target: "./src/index.html",
        }),
        dev({ dirs: ["public"], spa: true }),
        livereload("public"),
        /* TERSER ------------------------------------- */
        process.env.prod && terser(),
      ],
    },
  ],
  plugins: [
    /* PATH ALIAS --------------------------------- */
    alias({
      entries: [
        {
          find: "src",
          replacement: path.resolve(projectRootDir, "src"),
        },
      ],
    }),
    resolve(),
    commonjs({
      exclude: "node_modules",
    }),
  ],
};
