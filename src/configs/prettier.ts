import { GLOB_HTML, GLOB_MARKDOWN, GLOB_VUE, parserPlain } from '@antfu/eslint-config'
import prettierPlugin from 'eslint-plugin-prettier'

import type { Linter } from 'eslint'

import type { PrettierOptions, PrettierRuleOptions, VendoredPrettierOptionsRequired } from '../prettier-rule'

// @ts-expect-error is valid
export type PrettierConfig = Linter.Config<PrettierRuleOptions>
export interface PrettierEnabledFiles {
  /**
   * eslint flat config files
   * @example ['*.html']
   */
  files: string[]
  /** name of the category */
  name: string
  /** perttier parser */
  parser: PrettierOptions['parser']
}

export const definePrettierConfig = (
  enabledFiles: PrettierEnabledFiles[],
  /** global overrides */
  prettierrc: Omit<PrettierOptions, 'parser'>
): PrettierConfig[] => {
  const basic: PrettierConfig = {
    languageOptions: {
      parser: parserPlain
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          parser: 'typescript',
          ...prettierrc
        },
        {
          fileInfoOptions: {
            withNodeModules: false
          },
          usePrettierrc: false
        }
      ]
    }
  }

  return [
    {
      name: 'qingshaner/prettier',
      plugins: {
        prettier: prettierPlugin
      },
      rules: {
        // @ts-expect-error ensure close eslint rules
        'prefer-arrow-callback': 'off',
        'prettier/prettier': 'off'
      }
    },
    ...enabledFiles.map<PrettierConfig>(({ files, name, parser }) => {
      // @ts-expect-error ensure close eslint rules
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      basic.rules['prettier/prettier'][1].parser = parser

      return {
        ...basic,
        files,
        name
      }
    })
  ]
}

export const prettier = (prettierConfig?: Partial<VendoredPrettierOptionsRequired>) => {
  return definePrettierConfig(
    [
      {
        files: [GLOB_VUE],
        name: 'qingshaner/prettier/vue',
        parser: 'vue'
      },
      {
        files: [GLOB_HTML],
        name: 'qingshaner/prettier/html',
        parser: 'html'
      },
      {
        files: [GLOB_MARKDOWN],
        name: 'qingshaner/prettier/markdown',
        parser: 'markdown'
      }
    ],
    {
      arrowParens: 'avoid',
      bracketSameLine: false,
      endOfLine: 'lf',
      jsxSingleQuote: false,
      parser: 'html',
      printWidth: 100,
      quoteProps: 'as-needed',
      semi: false,
      singleAttributePerLine: false,
      singleQuote: true,
      trailingComma: 'none',
      useTabs: false,
      vueIndentScriptAndStyle: false,
      xmlQuoteAttributes: 'double',
      xmlSortAttributesByKey: true,
      ...prettierConfig
    }
  )
}
