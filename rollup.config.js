import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

export default [{
  input: './src/index.ts',
  output: [
    {
      file: 'build/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'build/bundle.es.js',
      format: 'es'
    }
  ],
  external: [
    'react',
    'react-dom',
    'styled-components'
  ],
  plugins: [
    babel({ exclude: 'node_modules/**', babelHelpers: 'runtime' }),
    nodeResolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true, tsconfigOverride: { compilerOptions: { declaration: true, declarationDir: 'build-types' } }}),
    terser(),
    bundleSize(),
	]
}, {
  input: "./build-types/index.d.ts",
  output: [{ file: "build/index.d.ts", format: "es" }],
  plugins: [dts(), bundleSize()],
}]