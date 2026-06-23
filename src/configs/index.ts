import type { CSpellConfig } from './cspell'
import type { JavaScriptConfig } from './javascript'
import type { JSONCConfig } from './jsonc'
import type { PerfectionistConfig } from './perfectionist'
import type { PrettierConfig } from './prettier'
import type { TypeScriptConfig } from './typescript'
import type { VueConfig } from './vue'

export type {
  CSpellConfig,
  JavaScriptConfig,
  JSONCConfig,
  PerfectionistConfig,
  PrettierConfig,
  TypeScriptConfig,
  VueConfig
}

export { a11y, defineA11yRules } from './a11y'
export { banBiomeRepetitiveConfig } from './biome'
export { cspell, defineCSpellConfig } from './cspell'
export { defineGlobalIgnore } from './ignore'
export { defineJavaScriptConfig, javascript } from './javascript'
export { defineJSONCConfig, jsonc } from './jsonc'
export { definePerfectionistConfig, perfectionist } from './perfectionist'
export { definePrettierConfig, prettier } from './prettier'
export { defineTypeScriptConfig, typescript } from './typescript'
export { defineVueConfig, type VueConfigOverrideOptions, vue } from './vue'

export type { A11yConfig, A11yOverrideOptions } from './a11y'
export type { CSpellOverrideOptions } from './cspell'
export type { JavaScriptConfigCollection, JavaScriptOverrideOptions } from './javascript'
export type { JSONCConfigCollection, JSONCConfigOverrideOptions } from './jsonc'
export type { PerfectionistConfigCollection, PerfectionistOverrideOptions } from './perfectionist'
export type { PrettierEnabledFiles } from './prettier'
export type { TypeScriptConfigCollection, TypeScriptOverrideOptions } from './typescript'

export type Configs =
  | CSpellConfig
  | JavaScriptConfig
  | JSONCConfig
  | PerfectionistConfig
  | PrettierConfig
  | TypeScriptConfig
  | VueConfig
