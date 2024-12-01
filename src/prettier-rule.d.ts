import type { Linter } from 'eslint'

export type PrettierOptions = Partial<Omit<VendoredPrettierOptionsRequired, 'parser'>> &
  Pick<VendoredPrettierOptionsRequired, 'parser'>
export interface PrettierRuleOptions {
  /**
   * @see https://github.com/prettier/eslint-plugin-prettier#options
   */
  'prettier/prettier'?: Linter.RuleEntry<PrettierPrettier>
}
/** @link @antfu/esling-config/dist/index.d.ts */
export interface VendoredPrettierOptionsRequired {
  /**
   * Include parentheses around a sole arrow function parameter.
   * @default "always"
   */
  arrowParens: 'always' | 'avoid'
  /**
   * Put the `>` of a multi-line HTML (HTML, XML, JSX, Vue, Angular) element at the end of the last line instead of being
   * alone on the next line (does not apply to self closing elements).
   */
  bracketSameLine: boolean
  /**
   * Print spaces between brackets in object literals.
   */
  bracketSpacing: boolean
  /**
   * Which end of line characters to apply.
   * @default "lf"
   */
  endOfLine: 'auto' | 'cr' | 'crlf' | 'lf'
  /**
   * How to handle whitespaces in HTML.
   * @default "css"
   */
  htmlWhitespaceSensitivity: 'css' | 'ignore' | 'strict'
  /**
   * Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.
   * @deprecated use bracketSameLine instead
   */
  jsxBracketSameLine: boolean
  /**
   * Use single quotes in JSX.
   */
  jsxSingleQuote: boolean
  /**
   * Specify which parser to use.
   * @link https://prettier.io/docs/en/options.html#parser
   */
  parser:
    | 'acorn'
    | 'angular'
    | 'babel-flow'
    | 'babel'
    | 'bebel-ts'
    | 'css'
    | 'espree'
    | 'flow'
    | 'graphql'
    | 'html'
    | 'json-stringify'
    | 'json'
    | 'json5'
    | 'jsonc'
    | 'less'
    | 'lwc'
    | 'markdown'
    | 'mdx'
    | 'meriyah'
    | 'scss'
    | 'typescript'
    | 'vue'
    | 'yaml'
  /**
   * Provide ability to support new languages to prettier.
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  plugins: Array<string | unknown>
  /**
   * Specify the line length that the printer will wrap on.
   * @default 120
   */
  printWidth: number
  /**
   * By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer.
   * In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out.
   * @default "preserve"
   */
  proseWrap: 'always' | 'never' | 'preserve'
  /**
   * Change when properties in objects are quoted.
   * @default "as-needed"
   */
  quoteProps: 'as-needed' | 'consistent' | 'preserve'
  /**
   * Format only a segment of a file.
   * @default Number.POSITIVE_INFINITY
   */
  rangeEnd: number
  /**
   * Format only a segment of a file.
   */
  rangeStart: number
  /**
   * Print semicolons at the ends of statements.
   */
  semi: boolean
  /**
   * Enforce single attribute per line in HTML, XML, Vue and JSX.
   * @default false
   */
  singleAttributePerLine: boolean
  /**
   * Use single quotes instead of double quotes.
   */
  singleQuote: boolean
  /**
   * Specify the number of spaces per indentation-level.
   */
  tabWidth: number
  /**
   * Print trailing commas wherever possible.
   */
  trailingComma: 'all' | 'es5' | 'none'
  /**
   * Indent lines with tabs instead of spaces
   */
  useTabs?: boolean
  /**
   * Whether or not to indent the code inside <script> and <style> tags in Vue files.
   * @default false
   */
  vueIndentScriptAndStyle: boolean
  /**
   * How to handle whitespaces in XML.
   * @default "preserve"
   */
  xmlQuoteAttributes: 'double' | 'preserve' | 'single'
  /**
   * Whether to put a space inside the brackets of self-closing XML elements.
   * @default true
   */
  xmlSelfClosingSpace: boolean
  /**
   * Whether to sort attributes by key in XML elements.
   * @default false
   */
  xmlSortAttributesByKey: boolean
  /**
   * How to handle whitespaces in XML.
   * @default "ignore"
   */
  xmlWhitespaceSensitivity: 'ignore' | 'preserve' | 'strict'
}

/* ======= Declarations ======= */
// ----- prettier/prettier -----
type PrettierPrettier =
  | []
  | [
      PrettierOptions,
      {
        fileInfoOptions?: {
          [key: string]: unknown
          withNodeModules?: boolean
        }
        /** @default true */
        usePrettierrc?: boolean
      }
    ]
  | [PrettierOptions]
