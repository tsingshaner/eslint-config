import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

import type { Linter } from 'eslint'

import { javascript, perfectionist, typescript } from '../src/configs'

interface RuleConfig {
  configs: Linter.Config[]
  exportName: string
  outputFileName: string
}

await main()
async function main() {
  const ROOT_DIR = fileURLToPath(new URL('../src', import.meta.url))

  const ruleOptions: RuleConfig[] = [
    {
      configs: [
        {
          plugins: {
            '': {
              rules: Object.fromEntries(builtinRules.entries())
            }
          }
        }
      ],
      exportName: 'JavaScriptRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'javascript.rule.d.ts')
    },
    {
      configs: typescript('tsconfigRootDir') as Linter.Config[],
      exportName: 'TypeScriptRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'typescript.rule.d.ts')
    },
    {
      configs: [perfectionist()],
      exportName: 'PerfectionistRuleOptions',
      outputFileName: resolve(ROOT_DIR, 'perfectionist.rule.d.ts')
    }
  ]

  const promises = ruleOptions.map(({ configs, exportName, outputFileName }) => {
    return extractRuleTypes(configs, resolve(ROOT_DIR, outputFileName), exportName)
  })

  return Promise.all(promises)
}

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
