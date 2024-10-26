import { resolve } from 'node:path'

import { defineConfig } from 'tsup'

const ROOT = resolve(import.meta.dirname, '..')

export default defineConfig({
  bundle: true,
  clean: true,
  dts: true,
  entry: {
    index: resolve(ROOT, 'src/index.ts')
  },
  format: ['esm', 'cjs'],
  minify: true,
  outDir: 'dist',
  target: 'esnext',
  tsconfig: resolve(ROOT, 'tsconfig.json')
})
