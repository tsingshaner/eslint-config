export { banBiomeRepetitiveConfig } from './biome'
export { defineGlobalIgnore } from './ignore'

export { defineJavaScriptConfig, javascript } from './javascript'
export type { JavaScriptConfig, JavaScriptConfigCollection, JavaScriptOverrideOptions } from './javascript'

export { defineJSONCConfig, jsonc } from './jsonc'
export type { JSONCConfig, JSONCConfigCollection, JSONCConfigOverrideOptions } from './jsonc'

export { definePerfectionistConfig, perfectionist } from './perfectionist'
export type { PerfectionistConfig, PerfectionistConfigCollection, PerfectionistOverrideOptions } from './perfectionist'

export { defineTypeScriptConfig, typescript } from './typescript'
export type { TypeScriptConfigCollection, TypeScriptOverrideOptions } from './typescript'

export { unocss, vue } from '@antfu/eslint-config'

import { formatters, ignores, vue } from '@antfu/eslint-config'

import type { Linter } from 'eslint'

import { banBiomeRepetitiveConfig } from './biome'
import { defineGlobalIgnore } from './ignore'
import { javascript } from './javascript'
import { jsonc, type JSONCConfigOverrideOptions } from './jsonc'
import { perfectionist, type PerfectionistOverrideOptions } from './perfectionist'
import { typescript, type TypeScriptOverrideOptions } from './typescript'
export async function formatter() {
  return [
    await formatters({
      html: 'prettier',
      markdown: 'prettier',
      prettierOptions: {
        printWidth: 100,
        semi: false,
        singleQuote: true,
        trailingComma: 'none'
      },
      slidev: false,
      svg: false,
      xml: false
    })
  ].flat() as Linter.Config[]
}

export interface QingshanerESLintOptions {
  extra?: Linter.Config[]
  formatter?: boolean
  ignores: Parameters<typeof defineGlobalIgnore>
  jsonc?: boolean | JSONCConfigOverrideOptions
  perfectionist?: boolean | PerfectionistOverrideOptions
  typescript?: [tsconfigRootDir: string, options?: TypeScriptOverrideOptions] | false
  useBiome?: boolean
  vue?: boolean
}
export const qingshanerESLintConfig = async ({
  extra = [],
  formatter: useFormatter = false,
  ignores,
  jsonc: useJSONC = false,
  perfectionist: usePerfectionist = false,
  typescript: useTypescrit = false,
  useBiome = false,
  vue: useVue = false
}: QingshanerESLintOptions): Promise<Linter.Config[]> => {
  const configs: Linter.Config[] = [defineGlobalIgnore(...ignores), javascript()]

  if (useFormatter) {
    configs.push(...(await formatter()))
  }

  if (useJSONC) {
    configs.push(...jsonc(typeof useJSONC === 'boolean' ? undefined : useJSONC))
  }

  if (usePerfectionist) {
    configs.push(perfectionist(typeof usePerfectionist === 'boolean' ? undefined : usePerfectionist))
  }

  if (useTypescrit) {
    configs.push(...typescript(...useTypescrit))
  }

  if (useBiome) {
    configs.push(banBiomeRepetitiveConfig())
  }

  if (useVue) {
    configs.push(
      ...(await vue({
        typescript: !!useTypescrit
      }))
    )
  }

  configs.push(...extra)

  return configs
}
