import { resolve } from 'node:path'

import { qingshanerESLintConfig } from './src'

export default qingshanerESLintConfig({
  ignores: [['pnpm-lock.yaml', './test/fixtures/inout/**'], resolve(__dirname, '.gitignore')],
  jsonc: true,
  perfectionist: true,
  prettier: true,
  typescript: [__dirname],
  useBiome: true,
  vue: true
})
