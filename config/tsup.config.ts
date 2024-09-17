import { defineConfig } from 'tsup'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentPath = fileURLToPath(new URL('.', import.meta.url))
const sourceDir = resolve(currentPath, '../src')

export default defineConfig({
  bundle: true,
  target: 'esnext',
  entry: {
    index: resolve(sourceDir, 'index.ts')
  },
  outDir: 'dist',
  dts: true,
  tsconfig: resolve(currentPath, 'tsconfig.lib.json'),
  format: ['esm', 'cjs'],
  minify: true,
  clean: true
})
