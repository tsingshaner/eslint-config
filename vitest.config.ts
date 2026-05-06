import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

const root = import.meta.dirname

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src')
    }
  },
  root,
  test: {
    coverage: {
      include: ['src/']
    },
    testTimeout: 15000
  }
})
