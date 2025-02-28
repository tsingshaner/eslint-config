import { resolve } from 'node:path'

import { presetESLintConfig } from './dist/index'

export default presetESLintConfig({
  a11y: true,
  biome: true,
  cspell: { configFile: resolve(__dirname, 'cspell.yaml') },
  ignores: [resolve(__dirname, '.gitignore'), ['pnpm-lock.yaml', 'fixtures/**/*']],
  jsonc: true,
  perfectionist: true,
  prettier: true,
  react: true,
  typescript: [__dirname],
  unocss: true,
  vue: true
})
