import eslint from '@eslint/js'
import globals from 'globals'

import type { Linter } from 'eslint'

import type { JavaScriptRuleOptions } from '../javascript.rule'

// @ts-expect-error is valid
export type JavaScriptConfig = Linter.Config<JavaScriptRuleOptions>
export type JavaScriptConfigCollection = keyof typeof eslint.configs

export interface JavaScriptOverrideOptions {
  languageOptions?: {
    globals?: GlobalBuildIn
  }
  rules?: JavaScriptRuleOptions
}
type GlobalBuildIn = Record<string, 'off' | 'readonly' | 'writable' | boolean>

export const javascript = (
  overrides?: {
    globals?: (GlobalBuildIn | keyof typeof globals)[]
  } & JavaScriptOverrideOptions
): JavaScriptConfig => {
  const overridesArg: JavaScriptOverrideOptions = {
    rules: overrides?.rules,
    languageOptions: {}
  }

  if (overrides?.globals && Array.isArray(overrides.globals) && overrides.globals.length > 0) {
    overridesArg.languageOptions = {
      globals: overrides.globals
        .map((g) => {
          if (typeof g === 'string') {
            return globals[g]
          }

          return g
        })
        .reduce<GlobalBuildIn>((acc, g) => {
          return Object.assign(acc, g)
        }, {})
    }
  }

  return defineJavaScriptConfig('recommended', overridesArg)
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
        window: 'readonly',
        ...overrides?.languageOptions?.globals
      }
    },
    ...config,
    name: 'qingshaner/javascript',
    rules: {
      ...config.rules,
      ...overrides?.rules
    }
  }
}
