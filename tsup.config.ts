import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  splitting: false,
  clean: true,
  esbuildOptions(options) {
    options.resolveExtensions = ['.ts', '.js'];
  },
});