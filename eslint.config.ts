import { resolve } from 'node:path'

import { presetESLintConfig } from './src'

export default presetESLintConfig({
  a11y: true,
  biome: true,
  ignores: [resolve(__dirname, '.gitignore'), ['pnpm-lock.yaml', './test/fixtures/inout/**']],
  jsonc: true,
  perfectionist: true,
  prettier: true,
  typescript: [__dirname],
  vue: true
})
