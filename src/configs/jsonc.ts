import jsoncPlugin from 'eslint-plugin-jsonc'

import type { Linter } from 'eslint'

import type { JSONCRuleOptions } from '../jsonc.rule'
import type { IncludePrefix, OmitItem } from '../type-utils'

// @ts-expect-error is valid
export type JSONCConfig = Linter.Config<JSONCRuleOptions>
export type JSONCConfigCollection = OmitItem<
  IncludePrefix<keyof typeof jsoncPlugin.configs, 'flat/'>,
  'flat/all' | 'flat/base'
>
export interface JSONCConfigOverrideOptions {
  rules?: JSONCRuleOptions
}

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

  const configs = jsoncPlugin.configs['flat/base'] as JSONCConfig[]
  if (configs[0]) {
    configs[0].name = 'qingshaner/jsonc'
  }

  if (configs[1]) {
    configs[1].name = 'qingshaner/jsonc/rules'
    configs[1].rules = {
      ...configs[1].rules,
      ...rules,
      ...overrides?.rules
    }
  }

  return configs
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
          'warn',
          {
            order: { natural: true, type: 'asc' },
            pathPattern: '^files$'
          }
        ],
        'jsonc/sort-keys': [
          'warn',
          {
            allowLineSeparatedGroups: true,
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
            allowLineSeparatedGroups: true,
            order: { type: 'asc' },
            // cspell:disable-next-line
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$'
          },
          {
            allowLineSeparatedGroups: true,
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$'
          },
          {
            allowLineSeparatedGroups: true,
            order: ['types', 'import', 'require', 'default'],
            pathPattern: '^exports.*$'
          },
          {
            allowLineSeparatedGroups: true,
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
    {
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
      name: 'antfu/sort/tsconfig-json',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            allowLineSeparatedGroups: true,
            order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
            pathPattern: '^$'
          },
          {
            allowLineSeparatedGroups: true,
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'jsx',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'lib',
              'moduleDetection',
              'noLib',
              'reactNamespace',
              'useDefineForClassFields',
              'emitDecoratorMetadata',
              'experimentalDecorators',
              /* Modules */
              'baseUrl',
              'rootDir',
              'rootDirs',
              'customConditions',
              'module',
              'moduleResolution',
              'moduleSuffixes',
              'noResolve',
              'paths',
              'resolveJsonModule',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'typeRoots',
              'types',
              'allowArbitraryExtensions',
              'allowImportingTsExtensions',
              'allowUmdGlobalAccess',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',
              /* Emit */
              'declaration',
              'declarationDir',
              'declarationMap',
              'downlevelIteration',
              'emitBOM',
              'emitDeclarationOnly',
              'importHelpers',
              'importsNotUsedAsValues',
              'inlineSourceMap',
              'inlineSources',
              'mapRoot',
              'newLine',
              'noEmit',
              'noEmitHelpers',
              'noEmitOnError',
              'outDir',
              'outFile',
              'preserveConstEnums',
              'preserveValueImports',
              'removeComments',
              'sourceMap',
              'sourceRoot',
              'stripInternal',
              /* Interop Constraints */
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'forceConsistentCasingInFileNames',
              'isolatedDeclarations',
              'isolatedModules',
              'preserveSymlinks',
              'verbatimModuleSyntax',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck'
            ],
            pathPattern: '^compilerOptions$'
          }
        ]
      }
    }
  ]
}
