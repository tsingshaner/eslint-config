import { resolve } from 'node:path'

import {
  banBiomeRepetitiveConfig,
  defineESLintConfig,
  defineGlobalIgnore,
  formatter,
  javascript,
  jsonc,
  perfectionist,
  typescript
} from './src'

export default defineESLintConfig(async () => [
  defineGlobalIgnore(['pnpm-lock.yaml', './test/fixtures/inout/**'], resolve(__dirname, '.gitignore')),
  javascript(),
  ...(await formatter()),
  ...jsonc(),
  ...typescript(__dirname),
  perfectionist(),
  banBiomeRepetitiveConfig()
])
