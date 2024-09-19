import perfectionistPlugin from 'eslint-plugin-perfectionist'

import type { Linter } from 'eslint'

import type { PerfectionistRuleOptions } from '../perfectionist.rule'

export type PerfectionistConfigCollection = keyof typeof perfectionistPlugin.configs
// @ts-expect-error is valid
export type PerfectionistConfig = Linter.Config<PerfectionistRuleOptions>
export interface PerfectionistOverrideOptions {
  rules?: PerfectionistRuleOptions
}

export const definePerfectionistConfig = <T extends PerfectionistConfigCollection>(
  collection: T,
  overrides?: PerfectionistOverrideOptions
): PerfectionistConfig => {
  const config: PerfectionistConfig = perfectionistPlugin.configs[collection]

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

export const perfectionist = (overrides?: PerfectionistOverrideOptions): PerfectionistConfig => {
  const config = definePerfectionistConfig('recommended-alphabetical')

  config.rules = {
    ...setWarn(config.rules ?? {}),
    'perfectionist/sort-imports': [
      'warn',
      {
        customGroups: {
          type: {},
          value: {
            component: ['@/*.vue', '*.vue']
          }
        },
        groups: [
          'builtin',
          'external',
          'type',
          'internal',
          'internal-type',
          ['parent', 'sibling', 'index', 'object'],
          'component',
          ['parent-type', 'sibling-type', 'index-type'],
          ['style', 'side-effect-style'],
          'unknown'
        ],
        ignoreCase: true,
        internalPattern: ['@/**', '~/**'],
        newlinesBetween: 'always'
      }
    ],
    ...overrides?.rules
  }

  return config
}
