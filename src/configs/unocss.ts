import unocssPlugin from '@unocss/eslint-plugin'

import type { Linter } from 'eslint'

import type { UnoCSSRuleOptions } from '../unocss.rule'

// @ts-expect-error is valid
export type UnoCSSConfig = Linter.Config<UnoCSSRuleOptions>
export interface UnoCSSOverrideOptions {
  files?: string[]
  rules?: UnoCSSRuleOptions
}

export const defeneUnoCSSConfig = ({ files, rules }: UnoCSSOverrideOptions = {}): [UnoCSSConfig] => {
  return [
    {
      ...(files && { files }),
      name: 'qingshaner/unocss',
      plugins: unocssPlugin.configs.flat.plugins,
      rules: {
        ...unocssPlugin.configs.flat.rules,
        ...rules
      }
    }
  ]
}

export const unocss = (overrides?: UnoCSSOverrideOptions): UnoCSSConfig[] => defeneUnoCSSConfig(overrides)
