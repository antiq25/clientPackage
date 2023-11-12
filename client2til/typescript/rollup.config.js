import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import  esbuild  from 'rollup-plugin-esbuild';

export default {
  input: '../typescript/bundle.ts', // Your entry file
  output: {
    dir: './api/dist',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    resolve({ browser: false }),
    commonjs(),
    esbuild({
      target: 'esnext',
      minify: false,
      legalComments: 'none',
    }),
  ],
  external: ['axios'],
};
