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

export const perfectionist = (overrides?: PerfectionistOverrideOptions): PerfectionistConfig => {
  return definePerfectionistConfig('recommended-alphabetical', {
    rules: {
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
      'perfectionist/sort-interfaces': 'warn',
      'perfectionist/sort-objects': 'warn',
      ...overrides?.rules
    }
  })
}
