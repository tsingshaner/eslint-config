import { sortTsconfig } from '@antfu/eslint-config'
import jsoncPlugin from 'eslint-plugin-jsonc'

import type { Linter } from 'eslint'

import type { JSONCRuleOptions } from '../jsonc.rule'
import type { IncludePrefix, OmitItem } from '../type-utils'

export type JSONCConfigCollection = OmitItem<
  IncludePrefix<keyof typeof jsoncPlugin.configs, 'flat/'>,
  'flat/all' | 'flat/base'
>
export interface JSONCConfigOverrideOptions {
  rules?: JSONCRuleOptions
}
// @ts-expect-error is valid
export type JSONCConfig = Linter.Config<JSONCRuleOptions>

export const defineJSONCConfig = <T extends JSONCConfigCollection>(
  collection: T | T[],
  overrides?: JSONCConfigOverrideOptions
): JSONCConfig[] => {
  const rules: Record<string, unknown> = {}

  if (Array.isArray(collection)) {
    for (const item of collection) {
      Object.assign(rules, jsoncPlugin.configs[item].at(-1)?.rules)
    }
  } else {
    Object.assign(rules, jsoncPlugin.configs[collection].at(-1)?.rules)
  }

  return [
    ...(jsoncPlugin.configs['flat/base'] as JSONCConfig[]),
    {
      name: 'qingshaner/jsonc',
      rules: {
        ...rules,
        ...overrides?.rules
      }
    }
  ]
}

export const jsonc = (overrides?: JSONCConfigOverrideOptions): JSONCConfig[] => {
  return [
    ...defineJSONCConfig(['flat/prettier', 'flat/recommended-with-jsonc'], overrides),
    /** @link https://github.com/antfu/eslint-config/blob/main/src/configs/sort.ts */
    {
      files: ['**/package.json'],
      name: 'antfu/sort/package-json',
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$'
          }
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'contributors',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig'
            ],
            pathPattern: '^$'
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$'
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$'
          },
          {
            order: ['types', 'import', 'require', 'default'],
            pathPattern: '^exports.*$'
          },
          {
            order: [
              // client hooks only
              'pre-commit',
              'prepare-commit-msg',
              'commit-msg',
              'post-commit',
              'pre-rebase',
              'post-rewrite',
              'post-checkout',
              'post-merge',
              'pre-push',
              'pre-auto-gc'
            ],
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$'
          }
        ]
      }
    },
    ...sortTsconfig()
  ]
}
