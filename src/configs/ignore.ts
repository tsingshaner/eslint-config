import { convertIgnorePatternToMinimatch, includeIgnoreFile } from '@eslint/compat'

import type { Linter } from 'eslint'

export { convertIgnorePatternToMinimatch, includeIgnoreFile }

/**
 * return a flat config with ignore patterns for eslint to ignore files
 * @param patterns ignore patterns
 * @param ignoreFileAbsolutePath absolute path of ignore file to include
 * @returns flat config
 */
export const defineGlobalIgnore = (patterns: string[], ignoreFileAbsolutePath?: string): Linter.Config => {
  const config = {
    ignores: patterns.map(convertIgnorePatternToMinimatch),
    name: 'qingshaner/base/ignores'
  }

  if (ignoreFileAbsolutePath !== undefined) {
    const ignoreConfig = includeIgnoreFile(ignoreFileAbsolutePath)
    config.ignores.unshift(...(ignoreConfig.ignores ?? []))
  }

  return config
}
