import type { Linter } from 'eslint'
import type { ConfigWithExtends } from 'typescript-eslint'

export * from './configs'

export type * from './javascript.rule'
export type * from './perfectionist.rule'
export type * from './typescript.rule'

export const defineESLintConfig = async (
  configs: (() => Promise<(ConfigWithExtends | Linter.Config)[]>) | (ConfigWithExtends | Linter.Config)[]
) => (configs instanceof Function ? configs() : configs)
