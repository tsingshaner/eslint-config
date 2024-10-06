import reactPlugin from 'eslint-plugin-react'

import type { ESLint, Linter } from 'eslint'

import { GLOB_SRC } from '../globs'

import type { ReactRuleOptions } from '../react.rule'

// @ts-expect-error is valid
export type ReactConfig = Linter.Config<ReactRuleOptions>
export interface ReactOverrideOptions {
  files?: string[]
  rules?: ReactRuleOptions
  settings?: {
    /**
     * Regex for Component Factory to use
     * @default 'createReactClass'
     */
    createClass?: string
    /**
     * Default React version to use when the version you have installed cannot be detected.
     * You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
     * Defaults to the "defaultVersion" setting and warns if missing, and to "detect" in the future.
     * If not provided, defaults to the latest React version.
     */
    defaultVersion?: string
    /** Flow version */
    flowVersion?: string
    /**
     * Fragment to use (may be a property of <pragma>)
     * @default "Fragment"
     */
    fragment?: string
    /**
     * Pragma to use
     * @default "React"
     */
    pragma?: string
    /**
     * React version.
     * @default "detect" automatically picks the version you have installed.
     */
    version?: string
  }
}

export const defineReactConfig = ({
  files = [GLOB_SRC],
  rules,
  settings
}: ReactOverrideOptions = {}): ReactConfig[] => {
  return [
    {
      files: files,
      name: 'qingshaner/react',
      plugins: {
        react: reactPlugin.configs.flat.recommended.plugins.react as ESLint.Plugin
        // 'react-hooks': is implemented in Biome, so we can't use it directly
        // 'react-refresh': is implemented in Biome, so we can't use it directly
      },
      rules: {
        ...(reactPlugin.configs.flat.recommended.rules as ReactRuleOptions),
        ...(reactPlugin.configs.flat['jsx-runtime'].rules as ReactRuleOptions),
        ...rules
      },
      settings: {
        react: {
          createClass: 'createReactClass',
          defaultVersion: '',
          fragment: 'Fragment',
          pragma: 'React',
          version: 'detect',
          ...settings
        }
      }
    }
  ]
}

export const react = (overrides?: ReactOverrideOptions): ReactConfig[] => {
  return defineReactConfig(overrides)
}
