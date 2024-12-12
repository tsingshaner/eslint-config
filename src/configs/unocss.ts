import unocssPlugin from '@unocss/eslint-plugin'

import type { ESLint, Linter } from 'eslint'

import type { UnoCSSRuleOptions } from '../unocss.rule'

// @ts-expect-error is valid
export type UnoCSSConfig = Linter.Config<UnoCSSRuleOptions>
export interface UnoCSSOverrideOptions {
  files?: string[]
  rules?: UnoCSSRuleOptions
}

export const defineUnoCSSConfig = ({ files, rules }: UnoCSSOverrideOptions = {}): [UnoCSSConfig] => {
  return [
    {
      ...(files && { files }),
      name: 'qingshaner/unocss',
      plugins: unocssPlugin.configs.flat.plugins as unknown as Record<'unocss', ESLint.Plugin>,
      rules: {
        ...unocssPlugin.configs.flat.rules,
        ...rules
      }
    }
  ]
}

export const unocss = (overrides?: UnoCSSOverrideOptions): UnoCSSConfig[] => defineUnoCSSConfig(overrides)
