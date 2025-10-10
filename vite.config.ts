import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'

import dts from 'unplugin-dts/rolldown'

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
    rolldownOptions: {
      external: (id: string) => Object.keys(pkgJSON.dependencies).includes(id) || id.startsWith('node:')
    }
  },
  plugins: [
    dts({
      bundleTypes: true,
      copyDtsFiles: true,
      include: ['src/**/*', 'src/**/*.d.ts'],
      tsconfigPath: resolve(root, 'tsconfig.json')
    }),
    {
      async buildEnd() {
        await rm(resolve(root, 'dist/src'), { force: true, recursive: true })
      },
      name: 'clean-dist'
    }
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
