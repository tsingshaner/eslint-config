import { resolve } from 'node:path'

import {
  banBiomeRepetitiveConfig,
  defineESLintConfig,
  defineGlobalIgnore,
  javascript,
  perfectionist,
  typescript
} from './src'

export default defineESLintConfig([
  defineGlobalIgnore([], resolve(__dirname, '.gitignore')),
  javascript(),
  ...typescript(resolve(__dirname, 'tsconfig.json')),
  perfectionist(),
  banBiomeRepetitiveConfig()
])
