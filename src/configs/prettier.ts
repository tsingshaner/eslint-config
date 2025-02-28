import prettierPlugin from 'eslint-plugin-prettier'

import type { Linter } from 'eslint'

import { GLOB_HTML } from '../globs'
import { parserPlain } from '../parser-plain'

import type { PrettierOptions, PrettierRuleOptions, VendoredPrettierOptionsRequired } from '../prettier-rule'

// @ts-expect-error is valid
export type PrettierConfig = Linter.Config<PrettierRuleOptions>
export interface PrettierEnabledFiles {
  /**
   * eslint flat config files
   * @example ['*.html']
   */
  files: string[]
  /** prettier parser */
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
    ...enabledFiles.map<PrettierConfig>(({ files, parser }) => {
      // @ts-expect-error ensure close eslint rules
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      basic.rules['prettier/prettier'][1].parser = parser

      return {
        ...basic,
        files,
        name: `qingshaner/prettier/${parser}`
      }
    })
  ]
}

export const prettier = (prettierConfig?: Partial<VendoredPrettierOptionsRequired>): PrettierConfig[] => {
  return definePrettierConfig(
    [
      {
        files: [GLOB_HTML],
        parser: 'html'
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
