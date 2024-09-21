// @ts-expect-error:7016 no types for eslint-plugin-react
import reactPlugin from 'eslint-plugin-react'
// import * as reactHooksPlugin from 'eslint-plugin-react-hooks'

import type { Linter } from 'eslint'

import { GLOB_SRC } from '../globs'

import type { ReactRuleOptions } from '../react.rule'

// @ts-expect-error is valid
export type ReactConfig = Linter.Config<ReactRuleOptions>
export interface ReactOverrideOptions {
  files?: string[]
  rules?: ReactRuleOptions
}

interface ReactPlugin {
  configs: Record<'jsx-runtime' | 'recommended', Linter.Config>
}

export const defineReactConfig = ({ files = [GLOB_SRC], rules }: ReactOverrideOptions = {}): ReactConfig[] => {
  return [
    {
      files: files,
      name: 'qingshaner/react',
      plugins: {
        react: reactPlugin as ReactPlugin
        // 'react-hooks': is implemented in Biome, so we can't use it directly
        // 'react-refresh': is implemented in Biome, so we can't use it directly
      },
      rules: {
        ...(reactPlugin as ReactPlugin).configs.recommended.rules,
        ...(reactPlugin as ReactPlugin).configs['jsx-runtime'].rules,
        ...rules
      }
    }
  ]
}

export const react = (overrides?: ReactOverrideOptions) => {
  return defineReactConfig(overrides)
}
