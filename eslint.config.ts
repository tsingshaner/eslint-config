import { resolve } from 'node:path'

import {
  banBiomeRepetitiveConfig,
  defineESLintConfig,
  defineGlobalIgnore,
  formatter,
  javascript,
  perfectionist,
  typescript
} from './src'

export default defineESLintConfig(async () => [
  defineGlobalIgnore(['pnpm-lock.yaml'], resolve(__dirname, '.gitignore')),
  javascript(),
  ...(await formatter()),
  ...typescript(resolve(__dirname, 'tsconfig.json')),
  perfectionist(),
  banBiomeRepetitiveConfig()
])
