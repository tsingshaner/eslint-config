import cspellPlugin from '@cspell/eslint-plugin'

import type { Options } from '@cspell/eslint-plugin'
import type { Linter } from 'eslint'

// @ts-expect-error error from @cspell/eslint-plugin.Options
export type CSpellConfig = Linter.Config<CSpellRuleOptions>

interface CSpellRuleOptions {
  /** CSpell spellchecker */
  '@cspell/spellchecker'?: Linter.RuleEntry<[] | [Partial<Options>]>
}

/**
 * CSpell configuration definition function
 * @see https://cspell.org/
 * @param opts - Options to customize the spell checker
 * ```
 */
export const defineCSpellConfig = (opts?: CSpellRuleOptions): [CSpellConfig] => [
  {
    name: 'qingshaner/cspell',
    plugins: {
      '@cspell': cspellPlugin
    },
    rules: {
      '@cspell/spellchecker': opts?.['@cspell/spellchecker'] ?? 'warn'
    }
  }
]

/**
 * `@cspell/spellchecker` rule options
 * @see https://github.com/streetsidesoftware/cspell/tree/main/packages/cspell-eslint-plugin#options
 */
export interface CSpellOverrideOptions extends Partial<Options> {
  /** @default 'warn' */
  level?: Linter.RuleSeverity
}

/**
 * CSpell configuration definition function
 * @param opts - Options to customize the spell checker
 * @example
 * ```ts
 * cspell({
 *   level: 'error',
 *   options: {
 *     words: ['acme', 'foo'],
 *     ignoreWords: ['bar']
 *   }
 * })
 * ```
 */
export const cspell = ({ level, ...opts }: CSpellOverrideOptions = {}): [CSpellConfig] =>
  defineCSpellConfig(
    opts && {
      '@cspell/spellchecker': [level ?? 'warn', opts ?? {}]
    }
  )
