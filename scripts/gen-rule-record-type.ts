import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

import type { Linter } from 'eslint'

import { a11y, jsonc, perfectionist, react, typescript, unocss, vue } from '../src/configs'

interface RuleConfig {
  configs: Linter.Config[]
  exportName: string
  outputFileName: string
}

await main()
async function extractRuleTypes(
  configs: Linter.Config[],
  output: Parameters<typeof writeFile>[0],
  exportTypeName = 'RuleOptions'
) {
  const dts = await flatConfigsToRulesDTS(configs, {
    exportTypeName,
    includeAugmentation: false
  })
  return writeFile(output, dts)
}
async function main() {
  const ROOT_DIR = resolve(import.meta.dirname, '../src')
  const ruleOptions: RuleConfig[] = [
    {
      configs: a11y(),
      exportName: 'A11yRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'a11y.rule.d.ts')
    },
    {
      configs: [{ plugins: { '': { rules: Object.fromEntries(builtinRules.entries()) } } }],
      exportName: 'JavaScriptRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'javascript.rule.d.ts')
    },
    { configs: jsonc(), exportName: 'JSONCRuleOptions', outputFileName: resolve(ROOT_DIR, 'jsonc.rule.d.ts') },
    {
      configs: typescript('tsconfigRootDir') as Linter.Config[],
      exportName: 'TypeScriptRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'typescript.rule.d.ts')
    },
    {
      configs: perfectionist(),
      exportName: 'PerfectionistRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'perfectionist.rule.d.ts')
    },
    {
      configs: react(),
      exportName: 'ReactRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'react.rule.d.ts')
    },
    {
      configs: unocss(),
      exportName: 'UnoCSSRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'unocss.rule.d.ts')
    },
    { configs: vue(), exportName: 'VueRuleOptions', outputFileName: resolve(ROOT_DIR, 'vue.rule.d.ts') }
  ]

  const promises = ruleOptions.map(({ configs, exportName, outputFileName }) => {
    return extractRuleTypes(configs, resolve(ROOT_DIR, outputFileName), exportName)
  })

  return Promise.all(promises)
}
