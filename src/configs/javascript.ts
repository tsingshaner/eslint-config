import eslint from '@eslint/js'
import globals from 'globals'

import type { Linter } from 'eslint'

import type { JavaScriptRuleOptions } from '../javascript.rule'

// @ts-expect-error is valid
export type JavaScriptConfig = Linter.Config<JavaScriptRuleOptions>
export type JavaScriptConfigCollection = keyof typeof eslint.configs
export interface JavaScriptOverrideOptions {
  rules?: JavaScriptRuleOptions
}

export const javascript = (): JavaScriptConfig => {
  return defineJavaScriptConfig('recommended')
}

export const defineJavaScriptConfig = <T extends JavaScriptConfigCollection>(
  collection: T,
  overrides?: JavaScriptOverrideOptions
): JavaScriptConfig => {
  const config = eslint.configs[collection]

  return {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.es2025,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      }
    },
    name: 'qingshaner/javascript',
    ...config,
    rules: {
      ...config.rules,
      ...overrides?.rules
    }
  }
}
