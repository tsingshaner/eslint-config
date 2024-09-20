import { config, configs } from 'typescript-eslint'

import type { Linter } from 'eslint'

import { GLOB_TS, GLOB_TSX } from '../globs'

import type { TypeScriptRuleOptions } from '../typescript.rule'

type ConfigArray = (typeof configs)['recommendedTypeChecked']
// @ts-expect-error is valid
export type TypeScriptConfig = Linter.Config<TypeScriptRuleOptions>
export type TypeScriptConfigCollection = keyof typeof configs
export interface TypeScriptOverrideOptions {
  languageOptions?: ConfigArray[0]['languageOptions']
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
): TypeScriptConfig[] => {
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
    languageOptions: overrides?.languageOptions,
    name: 'qingshaner/typescript',
    rules: {
      ...overrides?.rules
    }
  }) as TypeScriptConfig[]
}

/**
 * A preset for qingshaner TypeScript eslint config.
 * @param tsconfigRootDir root dir for tsconfig.json
 * @param overrides overrides for rules
 */
export const typescript = (tsconfigRootDir: string, overrides?: TypeScriptOverrideOptions): TypeScriptConfig[] => {
  return defineTypeScriptConfig(['base'], {
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.vue'],
        projectService: true,
        tsconfigRootDir
      }
    },
    rules: {
      ...configs.recommendedTypeChecked.at(-1)?.rules,
      ...configs.stylisticTypeChecked.at(-1)?.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      ...overrides?.rules
    }
  }).map((c) => {
    c.files = [GLOB_TS, GLOB_TSX]
    return c
  })
}
