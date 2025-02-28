import type { CSpellConfig } from './cspell'
import type { JavaScriptConfig } from './javascript'
import type { JSONCConfig } from './jsonc'
import type { PerfectionistConfig } from './perfectionist'
import type { PrettierConfig } from './prettier'
import type { ReactConfig } from './react'
import type { TypeScriptConfig } from './typescript'
import type { UnoCSSConfig } from './unocss'
import type { VueConfig } from './vue'

export type {
  CSpellConfig,
  JavaScriptConfig,
  JSONCConfig,
  PerfectionistConfig,
  PrettierConfig,
  ReactConfig,
  TypeScriptConfig,
  UnoCSSConfig,
  VueConfig
}

export { a11y, defineA11yRules } from './a11y'

export type { A11yConfig, A11yOverrideOptions } from './a11y'

export { banBiomeRepetitiveConfig } from './biome'

export { cspell, defineCSpellConfig } from './cspell'
export type { CSpellOverrideOptions } from './cspell'

export { defineGlobalIgnore } from './ignore'

export { defineJavaScriptConfig, javascript } from './javascript'
export type { JavaScriptConfigCollection, JavaScriptOverrideOptions } from './javascript'

export { defineJSONCConfig, jsonc } from './jsonc'
export type { JSONCConfigCollection, JSONCConfigOverrideOptions } from './jsonc'

export { definePerfectionistConfig, perfectionist } from './perfectionist'
export type { PerfectionistConfigCollection, PerfectionistOverrideOptions } from './perfectionist'

export { definePrettierConfig, prettier } from './prettier'
export type { PrettierEnabledFiles } from './prettier'

export { defineReactConfig, react } from './react'
export type { ReactOverrideOptions } from './react'

export { defineTypeScriptConfig, typescript } from './typescript'
export type { TypeScriptConfigCollection, TypeScriptOverrideOptions } from './typescript'

export { defineUnoCSSConfig, unocss, type UnoCSSOverrideOptions } from './unocss'
export { defineVueConfig, vue, type VueConfigOverrideOptions } from './vue'

export type Configs =
  | CSpellConfig
  | JavaScriptConfig
  | JSONCConfig
  | PerfectionistConfig
  | PrettierConfig
  | ReactConfig
  | TypeScriptConfig
  | UnoCSSConfig
  | VueConfig
