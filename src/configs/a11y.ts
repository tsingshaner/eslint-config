// @ts-expect-error:7016 no declare module
import jsxA11y from 'eslint-plugin-jsx-a11y'
import vueA11y from 'eslint-plugin-vuejs-accessibility'

import type { Linter, Rule } from 'eslint'

import { GLOB_JSX, GLOB_TSX, GLOB_VUE } from '../globs'

import type { A11yRuleOptions } from '../a11y.rule'

// @ts-expect-error is valid
export type A11yConfig = Linter.Config<A11yRuleOptions>
export type A11yOverideOptions = Partial<Record<'jsx' | 'vue', A11yOverideOptionsItem>>
export interface A11yOverideOptionsItem {
  files?: string[]
  rules?: A11yRuleOptions
}

interface JSXA11yPlugin {
  flatConfigs: Record<'recommended', Record<'rules', Linter.Config['rules']>>
  meta: Record<'name' | 'version', string>
  rules: Record<string, Rule.RuleModule>
}

export const defineA11yRules = ({ jsx = {}, vue = {} }: A11yOverideOptions = {}): A11yConfig[] => {
  const vueA11yPluginName = 'vuejs-accessibility'

  return [
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        },
        sourceType: 'module'
      },
      name: 'qingshaner/a11y',
      plugins: {
        'jsx-a11y': jsxA11y as JSXA11yPlugin,
        [vueA11yPluginName]: vueA11y
      }
    },
    {
      files: jsx.files ?? [GLOB_TSX, GLOB_JSX],
      name: 'qingshaner/a11y/jsx',
      rules: {
        ...(jsxA11y as JSXA11yPlugin).flatConfigs.recommended.rules,
        ...jsx.rules
      }
    },
    {
      files: vue.files ?? [GLOB_VUE],
      name: 'qingshaner/a11y/vue',
      rules: {
        ...vueA11y.configs['flat/recommended'].at(-1)?.rules,
        ...vue.rules
      }
    }
  ]
}

export const a11y = ({ jsx = {}, vue = {} }: A11yOverideOptions = {}): A11yConfig[] => {
  return defineA11yRules({
    jsx,
    vue: {
      ...vue,
      rules: {
        ...Object.fromEntries(
          Reflect.ownKeys(vueA11y.rules).map((key) => [`vuejs-accessibility/${key.toString()}`, 2])
        ),
        'vuejs-accessibility/no-onchange': 0,
        ...vue.rules
      }
    }
  })
}
