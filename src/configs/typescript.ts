import { GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import { config, configs } from 'typescript-eslint'

import type { TypeScriptRuleOptions } from '../typescript.rule'

type ConfigArray = (typeof configs)['recommendedTypeChecked']
export type TypeScriptConfigCollection = keyof typeof configs
export interface TypeScriptOverrideOptions {
  rules?: TypeScriptRuleOptions
}

/**
 * Define a TypeScript config with overrides.
 * @param collection collection of TypeScript configs
 * @param overrides overrides for rules
 * @returns config array
 */
export const defineTypeScriptConfig = <T extends TypeScriptConfigCollection>(
  collection: T | T[],
  overrides?: TypeScriptOverrideOptions
): ConfigArray => {
  const conf = Array.isArray(collection) ? collection.map((c) => configs[c]).flat(2) : configs[collection]

  const confArray = (Array.isArray(conf) ? conf : ([conf] as ConfigArray)).reduce<ConfigArray>((acc, c) => {
    const index = acc.findIndex(({ name }) => name === c.name)

    if (index !== -1) {
      acc.splice(index, 1)
    }

    acc.push(c)

    return acc
  }, [])

  return config(...confArray, {
    name: 'qingshaner/typescript',
    rules: {
      ...overrides?.rules
    }
  })
}

/**
 * A preset for qingshaner TypeScript eslint config.
 * @param tsconfigRootDir root dir for tsconfig.json
 * @param overrides overrides for rules
 */
export const typescript = (tsconfigRootDir: string, overrides?: TypeScriptOverrideOptions): ConfigArray => {
  return config(
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir
        }
      },
      name: 'qingshaner/typescript/type-checked'
    },
    ...defineTypeScriptConfig(['recommendedTypeChecked', 'stylisticTypeChecked'], {
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        ...overrides?.rules
      }
    })
  ).map((c) => {
    c.files = [GLOB_TS, GLOB_TSX]
    return c
  })
}
