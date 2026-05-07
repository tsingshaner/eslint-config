import perfectionistPlugin from 'eslint-plugin-perfectionist'

import type { Linter } from 'eslint'

import type { PerfectionistRuleOptions } from '../perfectionist.rule'

// @ts-expect-error is valid
export type PerfectionistConfig = Linter.Config<PerfectionistRuleOptions>
export type PerfectionistConfigCollection =
  | 'recommended-alphabetical'
  | 'recommended-line-length'
  | 'recommended-natural'
export interface PerfectionistOverrideOptions {
  rules?: PerfectionistRuleOptions
}

export const definePerfectionistConfig = <T extends PerfectionistConfigCollection>(
  collection: T,
  overrides?: PerfectionistOverrideOptions
): PerfectionistConfig => {
  const config = (perfectionistPlugin as { configs: Record<PerfectionistConfigCollection, Linter.Config> }).configs[
    collection
  ]

  return {
    name: 'qingshaner/perfectionist',
    ...config,
    rules: {
      ...config.rules,
      ...overrides?.rules
    }
  }
}

const setWarn = (rules: Required<PerfectionistConfig>['rules']): PerfectionistConfig['rules'] => {
  for (const rule of Reflect.ownKeys(rules)) {
    const key = rule as keyof Required<PerfectionistRuleOptions>

    if (typeof rules[key] === 'string') {
      ;(rules[key] as string) = 'warn'
    } else if (Array.isArray(rules[key])) {
      rules[key][0] = 'warn'
    }
  }

  return rules
}

export const perfectionist = (overrides?: PerfectionistOverrideOptions): PerfectionistConfig[] => {
  const config = definePerfectionistConfig('recommended-alphabetical')

  config.rules = {
    ...setWarn(config.rules ?? {}),
    'perfectionist/sort-array-includes': ['warn', { type: 'natural' }],
    'perfectionist/sort-classes': [
      'warn',
      {
        partitionByComment: true,
        type: 'natural'
      }
    ],
    'perfectionist/sort-imports': [
      'warn',
      {
        customGroups: [
          {
            elementNamePattern: ['^@/.*\\.vue', '.*\\.vue'],
            groupName: 'component'
          }
        ],
        groups: [
          'value-builtin',
          'value-internal',
          'type-internal',
          'value-external',
          ['value-parent', 'value-sibling', 'value-index'],
          ['type-parent', 'type-sibling', 'type-index'],
          'component',
          'type-import',
          'style',
          'side-effect-style',
          'unknown'
        ],
        ignoreCase: true,
        internalPattern: ['^@/.*', '^~/.*'],
        newlinesBetween: 1,
        partitionByComment: true,
        type: 'natural'
      }
    ],
    'perfectionist/sort-modules': [
      'warn',
      {
        newlinesBetween: 'ignore',
        partitionByNewLine: true,
        type: 'natural'
      }
    ],
    'perfectionist/sort-objects': [
      'warn',
      {
        partitionByNewLine: true,
        type: 'natural'
      }
    ],
    ...overrides?.rules
  }

  return [config]
}
