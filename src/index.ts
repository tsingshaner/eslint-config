import type { Linter } from 'eslint'
import type { ConfigWithExtends } from 'typescript-eslint'

import {
  banBiomeRepetitiveConfig,
  defineGlobalIgnore,
  javascript,
  jsonc,
  perfectionist,
  prettier,
  typescript,
  vue
} from './configs'

import type {
  JSONCConfigOverrideOptions,
  PerfectionistOverrideOptions,
  TypeScriptOverrideOptions,
  VueConfigOverrideOptions
} from './configs'
import type { VendoredPrettierOptionsRequired } from './prettier-rule'

export * from './configs'
export type * from './javascript.rule'
export type * from './jsonc.rule'
export type * from './perfectionist.rule'
export type * from './prettier-rule'
export type * from './typescript.rule'

export interface QingshanerESLintOptions {
  extra?: Linter.Config[]
  ignores: Parameters<typeof defineGlobalIgnore>
  jsonc?: boolean | JSONCConfigOverrideOptions
  perfectionist?: boolean | PerfectionistOverrideOptions
  prettier?: boolean | Partial<VendoredPrettierOptionsRequired>
  typescript?: [tsconfigRootDir: string, options?: TypeScriptOverrideOptions] | false
  useBiome?: boolean
  vue?: boolean | VueConfigOverrideOptions
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

  if (useJSONC) {
    configs.push(...jsonc(typeof useJSONC === 'boolean' ? undefined : useJSONC))
  }

  if (usePerfectionist) {
    configs.push(perfectionist(typeof usePerfectionist === 'boolean' ? undefined : usePerfectionist))
  }

  if (useTypescrit) {
    configs.push(...typescript(...useTypescrit))
  }

  if (useVue) {
    configs.push(...vue(typeof useVue === 'boolean' ? undefined : useVue))
  }

  if (usePrettier) {
    configs.push(...prettier(usePrettier === true ? undefined : usePrettier))
  }

  configs.push(...extra)
  if (useBiome) {
    configs.push(banBiomeRepetitiveConfig())
  }

  return Promise.resolve(configs)
}

export const defineESLintConfig = async (
  configs: (() => Promise<(ConfigWithExtends | Linter.Config)[]>) | (ConfigWithExtends | Linter.Config)[]
) => (configs instanceof Function ? configs() : configs)
