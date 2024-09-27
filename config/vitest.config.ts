import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, '../src/')
    }
  },
  test: {
    coverage: {
      all: true,
      include: ['src/']
    },
    root: resolve(import.meta.dirname, '../'),
    testTimeout: 15000
  }
})
