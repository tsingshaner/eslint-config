import { resolve } from 'node:path'

import { presetESLintConfig } from './src'

export default presetESLintConfig({
  a11y: true,
  biome: true,
  ignores: [resolve(__dirname, '.gitignore'), ['pnpm-lock.yaml', 'fixtures/**/*']],
  jsonc: true,
  perfectionist: true,
  prettier: true,
  react: true,
  typescript: [__dirname],
  unocss: true,
  vue: true
})
