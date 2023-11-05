import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: '../src/bundle.ts', // Your entry file
  output: {
    dir: './api/dist',
    format: 'esm',
    sourcemap: false,
  },
  plugins: [
    // Add these before esbuild in the plugins array
    resolve({
      browser: false, // Adjust this if you're bundling for Node.js instead
    }),
    commonjs(),
    esbuild({
      // ... other esbuild options
    }),
    // ... other plugins
  ],
  // To silence the warning, tell Rollup which imports to treat as external
  external: ['axios'],
};
