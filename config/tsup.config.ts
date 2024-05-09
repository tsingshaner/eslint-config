import { defineConfig } from 'tsup'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentPath = fileURLToPath(new URL('.', import.meta.url))
const sourceDir = resolve(currentPath, '../src')

export default defineConfig({
  bundle: true,
  target: 'esnext',
  entry: {
    core: resolve(sourceDir, 'core/index.ts')
  },
  outDir: 'dist',
  dts: true,
  tsconfig: resolve(currentPath, 'tsconfig.app.json'),
  format: 'esm',
  clean: true
})
