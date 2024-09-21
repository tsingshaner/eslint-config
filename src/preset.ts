import type { Linter } from 'eslint'
import type { ConfigWithExtends } from 'typescript-eslint'

import {
  a11y,
  type A11yOverideOptions,
  banBiomeRepetitiveConfig,
  defineGlobalIgnore,
  javascript,
  jsonc,
  type JSONCConfigOverrideOptions,
  perfectionist,
  type PerfectionistOverrideOptions,
  prettier,
  typescript,
  type TypeScriptOverrideOptions,
  vue,
  type VueConfigOverrideOptions
} from './configs'

import type { VendoredPrettierOptionsRequired } from './prettier-rule'
import type { MaybePromise } from './type-utils'

export type ESLintConfig<T extends Linter.RulesRecord = Linter.RulesRecord> = ConfigWithExtends | Linter.Config<T>
export const defineESLintConfig = (configs: () => MaybePromise<ESLintConfig[]>) => {
  return configs instanceof Function ? configs() : configs
}

const applyConfig = <
  K extends unknown[],
  U extends MaybePromise<ESLintConfig[]>,
  T extends ((...args: K) => U) | (() => U)
>(
  factory: T,
  ...args: [enabled: boolean | undefined] | K
): U => {
  if (!args[0]) {
    return [] as ESLintConfig[] as U
  }

  return args[0] === true ? factory() : factory(...(args as K))
}

export interface PresetOptions {
  a11y?: A11yOverideOptions | boolean
  biome?: boolean
  extra?: ESLintConfig[]
  ignores: [ignoreAbsoluePath: string, overrides?: string[]]
  jsonc?: boolean | JSONCConfigOverrideOptions
  perfectionist?: boolean | PerfectionistOverrideOptions
  prettier?: boolean | Partial<VendoredPrettierOptionsRequired>
  typescript?: [tsconfigDir: string, overrides?: TypeScriptOverrideOptions] | false
  vue?: boolean | VueConfigOverrideOptions
}
export const presetESLintConfig = async ({
  a11y: a11yOpts,
  biome,
  extra = [],
  ignores,
  jsonc: jsoncOpts,
  perfectionist: perfectionistOpts,
  prettier: prettierOpts,
  typescript: typescriptOpts,
  vue: vueOpts
}: PresetOptions) => {
  const configs: ESLintConfig[] = [defineGlobalIgnore(ignores[1] ?? [], ignores[0]), javascript()]

  configs.push(...(await applyConfig(a11y, a11yOpts)))
  configs.push(...(await applyConfig(jsonc, jsoncOpts)))
  configs.push(...(await applyConfig(perfectionist, perfectionistOpts)))
  configs.push(...(await applyConfig(prettier, prettierOpts)))
  // @ts-expect-error TODO: fix types error
  configs.push(...(await applyConfig(typescript, typescriptOpts)))
  configs.push(...(await applyConfig(vue, vueOpts)))
  configs.push(...extra)

  return biome ? configs.concat(banBiomeRepetitiveConfig()) : configs
}
