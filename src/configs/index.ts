export { banBiomeRepetitiveConfig } from './biome'
export { defineGlobalIgnore } from './ignore'

export { defineJavaScriptConfig, javascript } from './javascript'
export type { JavaScriptConfigCollection } from './javascript'

export { defineJSONCConfig, jsonc } from './jsonc'
export type { JSONCConfig, JSONCConfigCollection, JSONCConfigOverrideOptions } from './jsonc'

export { definePerfectionistConfig, perfectionist } from './perfectionist'
export type { PerfectionistConfig, PerfectionistConfigCollection, PerfectionistOverrideOptions } from './perfectionist'

export { defineTypeScriptConfig, typescript } from './typescript'
export type { TypeScriptConfigCollection, TypeScriptOverrideOptions } from './typescript'

export { unocss, vue } from '@antfu/eslint-config'

import { formatters } from '@antfu/eslint-config'

import type { Linter } from 'eslint'
export async function formatter() {
  return [
    await formatters({
      html: 'prettier',
      markdown: 'prettier',
      prettierOptions: {
        printWidth: 100,
        semi: false,
        singleQuote: true,
        trailingComma: 'none'
      },
      slidev: false,
      svg: false,
      xml: false
    })
  ].flat() as Linter.Config[]
}

export interface QingshanerESLintOptions {
  formatter?: boolean
  perfectionist?: boolean
  typescript?: boolean
  useBiome?: boolean
  vue?: boolean
}
export const qingshanerESLintConfig = () => {}
