import type { Linter } from 'eslint'
import { includeIgnoreFile, convertIgnorePatternToMinimatch } from '@eslint/compat'

export { includeIgnoreFile, convertIgnorePatternToMinimatch }

/**
 * return a flat config with ignore patterns for eslint to ignore files
 * @param patterns ignore patterns
 * @param ignoreFileAbsolutePath absolute path of ignore file to include
 * @returns flat config
 */
export const defineGlobalIgnore = (patterns: string[], ignoreFileAbsolutePath?: string): Linter.Config => {
  const config = {
    name: '@qingshaner/global-ignore',
    ignores: patterns.map(convertIgnorePatternToMinimatch)
  }

  if (ignoreFileAbsolutePath !== undefined) {
    const ignoreConfig = includeIgnoreFile(ignoreFileAbsolutePath)
    config.ignores.unshift(...(ignoreConfig.ignores ?? []))
  }

  return config
}
