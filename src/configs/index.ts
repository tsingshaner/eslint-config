export { banBiomeRepetitiveConfig } from './biome'
export { defineGlobalIgnore } from './ignore'

export { defineJavaScriptConfig, javascript } from './javascript'
export type { JavaScriptConfig, JavaScriptConfigCollection, JavaScriptOverrideOptions } from './javascript'

export { defineJSONCConfig, jsonc } from './jsonc'
export type { JSONCConfig, JSONCConfigCollection, JSONCConfigOverrideOptions } from './jsonc'

export { definePerfectionistConfig, perfectionist } from './perfectionist'
export type { PerfectionistConfig, PerfectionistConfigCollection, PerfectionistOverrideOptions } from './perfectionist'

export { definePrettierConfig, prettier } from './prettier'
export type { PrettierConfig, PrettierEnabledFiles } from './prettier'

export { defineTypeScriptConfig, typescript } from './typescript'
export type { TypeScriptConfigCollection, TypeScriptOverrideOptions } from './typescript'

export { unocss, vue } from '@antfu/eslint-config'
import { vue } from '@antfu/eslint-config'

import type { Linter } from 'eslint'

import { banBiomeRepetitiveConfig } from './biome'
import { defineGlobalIgnore } from './ignore'
import { javascript } from './javascript'
import { jsonc, type JSONCConfigOverrideOptions } from './jsonc'
import { perfectionist, type PerfectionistOverrideOptions } from './perfectionist'
import { prettier } from './prettier'
import { typescript, type TypeScriptOverrideOptions } from './typescript'

import type { VendoredPrettierOptionsRequired } from '../prettier-rule'

export interface QingshanerESLintOptions {
  extra?: Linter.Config[]
  ignores: Parameters<typeof defineGlobalIgnore>
  jsonc?: boolean | JSONCConfigOverrideOptions
  perfectionist?: boolean | PerfectionistOverrideOptions
  prettier?: boolean | Partial<VendoredPrettierOptionsRequired>
  typescript?: [tsconfigRootDir: string, options?: TypeScriptOverrideOptions] | false
  useBiome?: boolean
  vue?: boolean
}
export const qingshanerESLintConfig = async ({
  extra = [],
  ignores,
  jsonc: useJSONC = false,
  perfectionist: usePerfectionist = false,
  prettier: usePrettier = false,
  typescript: useTypescrit = false,
  useBiome = false,
  vue: useVue = false
}: QingshanerESLintOptions): Promise<Linter.Config[]> => {
  const configs: Linter.Config[] = [defineGlobalIgnore(...ignores), javascript()]

  if (usePrettier) {
    configs.push(...prettier(usePrettier === true ? undefined : usePrettier))
  }

  if (useJSONC) {
    configs.push(...jsonc(typeof useJSONC === 'boolean' ? undefined : useJSONC))
  }

  if (usePerfectionist) {
    configs.push(perfectionist(typeof usePerfectionist === 'boolean' ? undefined : usePerfectionist))
  }

  if (useTypescrit) {
    configs.push(...typescript(...useTypescrit))
  }

  if (useBiome) {
    configs.push(banBiomeRepetitiveConfig())
  }

  if (useVue) {
    configs.push(
      ...(await vue({
        typescript: !!useTypescrit
      }))
    )
  }

  configs.push(...extra)

  return configs
}
