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
  exportTypeName: string
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
    { configs: a11y(), exportName: 'A11y', outputFileName: 'a11y' },
    {
      configs: [{ plugins: { '': { rules: Object.fromEntries(builtinRules.entries()) } } }],
      exportName: 'JavaScript',
      outputFileName: 'javascript'
    },
    { configs: jsonc(), exportName: 'JSONC', outputFileName: 'jsonc' },
    {
      configs: typescript('tsconfigRootDir') as Linter.Config[],
      exportName: 'TypeScript',
      outputFileName: 'typescript'
    },
    { configs: perfectionist(), exportName: 'Perfectionist', outputFileName: 'perfectionist' },
    { configs: react(), exportName: 'React', outputFileName: 'react' },
    { configs: unocss(), exportName: 'UnoCSS', outputFileName: 'unocss' },
    { configs: vue(), exportName: 'Vue', outputFileName: 'vue' }
  ]

  const promises = ruleOptions.map(({ configs, exportName, outputFileName }) => {
    return extractRuleTypes(configs, resolve(ROOT_DIR, `${outputFileName}.rule.d.ts`), `${exportName}RuleOptions`)
  })

  return Promise.all(promises)
}
