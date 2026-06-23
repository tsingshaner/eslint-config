import { resolve } from 'node:path'

import { presetESLintConfig } from './dist/index.mjs'

export default presetESLintConfig({
  a11y: true,
  biome: true,
  cspell: { configFile: resolve(__dirname, 'cspell.yaml') },
  ignores: [resolve(__dirname, '.gitignore'), ['fixtures/**/*']],
  jsonc: true,
  perfectionist: true,
  prettier: true,
  typescript: [__dirname],
  vue: true
})
