import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import esbuild, { minify } from "rollup-plugin-esbuild";
import html from "@rollup/plugin-html";
import dev from "rollup-plugin-dev";
import livereload from "rollup-plugin-livereload";
// import sass from 'node-sass';
// import scss from 'rollup-plugin-scss';
// import autoprefixer from 'autoprefixer';
// import css from 'rollup-plugin-postcss';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: [
    {
      format: "es",
      dir: "public",
      exports: "named",
      preferConst: true,
      sourcemap: !process.env.prod ? "inline" : false,
      chunkFileNames: "chunks/[name]-[hash].js",
      esModule: true,
      manualChunks: {
        mithril: ["mithril"],
      },
      plugins: [
        !process.env.prod &&
          dev({
            proxy: [{ from: "/api", to: "http://localhost:8787" }],
            dirs: ["public"],
            spa: true,
          }),
        !process.env.prod && livereload("public"),
        !process.env.prod && minify(),
      ],
    },
  ],
  plugins: [
    alias({
      customResolver: nodeResolve({
        extensions: [".ts"],
      }),
      entries: alias(["components", "views"]),
    }),
    esbuild(),
    nodeResolve({
      browser: true,
      extensions: [".ts", ".js"],
    }),
    commonjs({
      transformMixedEsModules: true,
      extensions: [".ts", ".js"],
    }),
    html({
      title: "Weather App SaaS",
      attributes: {
        html: { lang: "en" },
      },
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "minimum-scale=1, initial-scale=1, width=device-width",
        },
      ],
    }),
  ],
};
