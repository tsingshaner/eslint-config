import { resolve } from 'node:path'

import { defineConfig } from 'tsdown'

export default defineConfig({
  alias: {
    '@': resolve(import.meta.dirname, 'src')
  },
  clean: true,
  dts: {
    cjsReexport: true,
    oxc: true
  },
  entry: 'src/index.ts',
  format: ['esm', 'cjs']
})
