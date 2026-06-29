import type { Linter } from 'eslint'
import type { ConfigWithExtends } from 'typescript-eslint'

import {
  a11y,
  banBiomeRepetitiveConfig,
  cspell,
  defineGlobalIgnore,
  javascript,
  perfectionist,
  prettier,
  typescript,
  vue
} from './configs'

import type {
  A11yOverrideOptions,
  Configs,
  CSpellOverrideOptions,
  PerfectionistOverrideOptions,
  TypeScriptOverrideOptions,
  VueConfigOverrideOptions
} from './configs'
import type { VendoredPrettierOptionsRequired } from './prettier-rule'
import type { MaybePromise } from './type-utils'
import type { VueRuleOptions } from './vue.rule'

type ESLintConfig<T extends Linter.RulesRecord = Linter.RulesRecord> = ConfigWithExtends | Linter.Config<T>
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
  javascript?: Parameters<typeof javascript>[0]
  perfectionist?: boolean | PerfectionistOverrideOptions
  prettier?: boolean | Partial<VendoredPrettierOptionsRequired>
  typescript?: [tsconfigDir: string, overrides?: TypeScriptOverrideOptions] | false
  /** Enable `eslint-plugin-vue` */
  vue?: boolean | VueConfigOverrideOptions
}
export const presetESLintConfig = async ({
  a11y: a11yOpts,
  biome,
  cspell: cspellOpts,
  extra = [],
  ignores,
  javascript: javascriptOpts,
  perfectionist: perfectionistOpts,
  prettier: prettierOpts,
  typescript: typescriptOpts,
  vue: vueOpts
}: PresetOptions): Promise<ESLintConfig[]> => {
  const configs: ESLintConfig[] = [
    defineGlobalIgnore(
      ['bun.lock', 'bun.lockb', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', ...(ignores[1] ?? [])],
      ignores[0]
    ),
    javascript(javascriptOpts)
  ] satisfies ESLintConfig[]

  configs.push(...(await applyConfig(a11y, a11yOpts)))
  configs.push(...(await applyConfig(cspell, cspellOpts)))

  // if has biome, disable sort import & export rules
  if (perfectionistOpts && biome) {
    const overrideRules: PerfectionistOverrideOptions['rules'] = {
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-jsx-props': 'off',
      'perfectionist/sort-named-exports': 'off',
      'perfectionist/sort-named-imports': 'off'
    }
    if (perfectionistOpts === true) {
      perfectionistOpts = { rules: overrideRules }
    } else {
      perfectionistOpts.rules = {
        ...overrideRules,
        ...perfectionistOpts.rules
      }
    }
  }

  if (!biome) {
    configs.push(...(await applyConfig(prettier, prettierOpts)))
  }

  configs.push(...(await applyConfig(perfectionist, perfectionistOpts)))
  configs.push(...(Array.isArray(typescriptOpts) ? await applyConfig(typescript, ...typescriptOpts) : []))

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

  if (biome) {
    configs.push(banBiomeRepetitiveConfig())
    if (vueOpts) {
      configs.push({
        files: ['**/*.vue'],
        name: 'qingshaner/biome/patch/vue',
        rules: {
          '@typescript-eslint/no-unused-vars': 1
        }
      })
    }
  }

  return configs.concat(...extra)
}
