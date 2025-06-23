/**
 * @link https://biomejs.dev/linter/rules-sources/
 */

import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { exit } from 'node:process'

const implementedPlugins = [
  ['@mysticatea/eslint-plugin', '@mysticatea/'], // cspell:disable-line
  ['@next/eslint-plugin-next', '@next/next/'],
  ['ESLint', ''],
  ['GraphQL-ESLint', '@graphql-eslint/'],
  ['eslint-plugin-barrel-files', 'barrel-files/'],
  ['eslint-plugin-import', 'import/'],
  ['eslint-plugin-import-access', 'import-access/'],
  ['eslint-plugin-jest', 'jest/'],
  ['eslint-plugin-jsx-a11y', 'jsx-a11y/'],
  ['eslint-plugin-n', 'n/'],
  ['eslint-plugin-no-secrets', 'no-secrets/'],
  ['eslint-plugin-react', 'react/'],
  ['eslint-plugin-react-hooks', 'react-hooks/'],
  ['eslint-plugin-react-refresh', 'react-refresh/'],
  ['eslint-plugin-solid', 'solid/'],
  ['eslint-plugin-sonarjs', 'sonarjs/'], // cspell:disable-line
  ['eslint-plugin-stylistic', 'stylistic/'],
  ['eslint-plugin-unicorn', 'unicorn/'],
  ['eslint-plugin-unused-imports', 'unused-imports/'],
  ['typescript-eslint', '@typescript-eslint/']
] as const satisfies [name: string, prefix: string][]

const ignoredPlugins: Readonly<string[]> = [
  /** for rust */
  'Clippy', // cspell:disable-line
  /** for css */
  'Stylelint'
]

const fetchBiomeRulesMdx = async () => {
  const res = await fetch(
    'http://raw.githubusercontent.com/biomejs/website/main/src/content/docs/linter/rules-sources.mdx'
  )

  return res.text()
}

/** parse biomes mdx rule tables */
const cleanRuleMdx = (mdx: string) => {
  const tableRegex = /(\|.*?\|(?:\r?\n|\r)\|(?:[-:| ]+)\|(?:\r?\n|\r)(?:\|.*?\|(?:\r?\n|\r))*)/g

  const tables: string[] = mdx.trim().match(tableRegex) ?? []

  return tables.map((table) => {
    const rows = table
      .trim()
      .split(/\r?\n|\r/)
      .map((row) =>
        // row: '| xxx | xxx |'
        row
          .split('|')
          .slice(1, 3)
          .map((cell) => cell.trim())
      )

    return rows
  })
}

const parseBannedRules = (tables: string[][]): string[] => {
  const name = tables[0][0].split(' ')[0]
  const plugin = implementedPlugins.find((plugin) => plugin[0] === name)
  if (!plugin) {
    if (ignoredPlugins.includes(name)) {
      console.info(`Ignored plugin: ${name}`)
      return []
    }

    console.error(`Plugin not found on known plugins: ${name}`)
    exit(1)
  }

  console.info(`Processing plugin: ${plugin[0]} prefix: ${plugin[1]}`)

  return tables.splice(2).map((row) => {
    const rule = /^\[(.*)\]/.exec(row[0])

    if (rule === null) {
      console.error(`Rule not found on row: ${row.join(' | ')}`)
      exit(1)
    }

    return `${plugin[1]}${rule[1]}`
  })
}

await main()
async function main() {
  const mdx = await fetchBiomeRulesMdx()
  const tables = cleanRuleMdx(mdx)

  const bannedRules = tables.flatMap(parseBannedRules)

  const rules = bannedRules.reduce<Record<string, 0>>((acc, rule) => {
    acc[rule] = 0
    return acc
  }, {})

  const config = {
    name: 'qingshaner/disable/biome',
    rules
  }

  const code = `import type { Linter } from 'eslint'

export const banBiomeRepetitiveConfig = (): Linter.Config => {
  return ${JSON.stringify(config, null, 2)}
}
`
  return writeFile(resolve(import.meta.dirname, '../src/configs/biome.ts'), code)
}
