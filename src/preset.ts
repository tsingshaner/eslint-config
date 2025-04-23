import type { Linter } from 'eslint'
import type { ConfigWithExtends } from 'typescript-eslint'

import {
  a11y,
  banBiomeRepetitiveConfig,
  cspell,
  defineGlobalIgnore,
  javascript,
  jsonc,
  perfectionist,
  prettier,
  react,
  typescript,
  unocss,
  vue
} from './configs'
import { GLOB_VUE } from './globs'

import type {
  A11yOverrideOptions,
  Configs,
  CSpellOverrideOptions,
  JSONCConfigOverrideOptions,
  PerfectionistOverrideOptions,
  ReactOverrideOptions,
  TypeScriptConfig,
  TypeScriptOverrideOptions,
  UnoCSSOverrideOptions,
  VueConfigOverrideOptions
} from './configs'
import type { VendoredPrettierOptionsRequired } from './prettier-rule'
import type { MaybePromise } from './type-utils'
import type { VueRuleOptions } from './vue.rule'

export type ESLintConfig<T extends Linter.RulesRecord = Linter.RulesRecord> = ConfigWithExtends | Linter.Config<T>
export const defineESLintConfig = (configs: () => MaybePromise<ESLintConfig[]>): MaybePromise<ESLintConfig[]> => {
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
  a11y?: A11yOverrideOptions | boolean
  /**
   * Set true to disable eslint rules which biome checked
   * @defaultValue false
   */
  biome?: boolean
  cspell?: boolean | CSpellOverrideOptions
  /** Extra custom eslint flat configs */
  extra?: (Configs | ESLintConfig)[]
  /** Ignore check files */
  ignores: [ignoreAbsolutePath: string, overrides?: string[]]
  jsonc?: boolean | JSONCConfigOverrideOptions
  perfectionist?: boolean | PerfectionistOverrideOptions
  prettier?: boolean | Partial<VendoredPrettierOptionsRequired>
  react?: boolean | ReactOverrideOptions
  typescript?: [tsconfigDir: string, overrides?: TypeScriptOverrideOptions] | false
  /** Enable `@unocss/eslint-plugin` */
  unocss?: boolean | UnoCSSOverrideOptions
  /** Enable `eslint-plugin-vue` */
  vue?: boolean | VueConfigOverrideOptions
}
export const presetESLintConfig = async ({
  a11y: a11yOpts,
  biome,
  cspell: cspellOpts,
  extra = [],
  ignores,
  jsonc: jsoncOpts,
  perfectionist: perfectionistOpts,
  prettier: prettierOpts,
  react: reactOpts,
  typescript: typescriptOpts,
  unocss: unocssOpts,
  vue: vueOpts
}: PresetOptions): Promise<ESLintConfig[]> => {
  const configs: ESLintConfig[] = [
    defineGlobalIgnore(
      ['bun.lock', 'bun.lockb', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', ...(ignores[1] ?? [])],
      ignores[0]
    ),
    javascript()
  ] satisfies ESLintConfig[]

  configs.push(...(await applyConfig(a11y, a11yOpts)))
  configs.push(...(await applyConfig(cspell, cspellOpts)))
  configs.push(...(await applyConfig(jsonc, jsoncOpts)))
  configs.push(...(await applyConfig(perfectionist, perfectionistOpts)))
  configs.push(...(await applyConfig(prettier, prettierOpts)))
  configs.push(...(Array.isArray(typescriptOpts) ? await applyConfig(typescript, ...typescriptOpts) : []))
  configs.push(...(await applyConfig(react, reactOpts)))

  if (vueOpts && perfectionistOpts) {
    const overrideRules = {
      'vue/order-in-components': 'off',
      'vue/sort-keys': 'off'
    } satisfies VueRuleOptions

    vueOpts =
      typeof vueOpts === 'boolean'
        ? {
            rules: overrideRules
          }
        : {
            ...vueOpts,
            rules: {
              ...overrideRules,
              ...vueOpts.rules
            }
          }
  }

  configs.push(...(await applyConfig(vue, vueOpts)))
  configs.push(...(await applyConfig(unocss, unocssOpts)))

  if (biome) {
    configs.push(banBiomeRepetitiveConfig())
  }

  return configs.concat(...extra)
}
