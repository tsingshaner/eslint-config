import { resolve } from 'node:path'

import dts from 'vite-plugin-dts'

import type { UserConfig } from 'vite'
import type { InlineConfig } from 'vitest/node'

import pkgJSON from './package.json' with { type: 'json' }

const root = import.meta.dirname

export default {
  build: {
    lib: {
      entry: {
        index: resolve(root, 'src/index.ts')
      },
      formats: ['es', 'cjs']
    },
    minify: false,
    rollupOptions: {
      external: (id) => Object.keys(pkgJSON.dependencies).includes(id) || id.startsWith('node:')
    }
  },
  plugins: [
    dts({
      copyDtsFiles: true,
      include: ['src/**/*', 'src/**/*.d.ts'],
      rollupTypes: true,
      tsconfigPath: resolve(root, 'tsconfig.json')
    })
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src')
    }
  },
  root,
  test: {
    coverage: {
      all: true,
      include: ['src/']
    },
    testTimeout: 15000
  }
} satisfies { test: InlineConfig } & UserConfig
