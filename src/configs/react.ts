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

interface ReactPlugin {
  configs: Record<'jsx-runtime' | 'recommended', Linter.Config>
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
        react: reactPlugin as ReactPlugin
        // 'react-hooks': is implemented in Biome, so we can't use it directly
        // 'react-refresh': is implemented in Biome, so we can't use it directly
      },
      rules: {
        ...(reactPlugin as ReactPlugin).configs.recommended.rules,
        ...(reactPlugin as ReactPlugin).configs['jsx-runtime'].rules,
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

export const react = (overrides?: ReactOverrideOptions) => {
  return defineReactConfig(overrides)
}
