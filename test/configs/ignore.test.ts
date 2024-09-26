import { fileURLToPath } from 'node:url'

import { describe } from 'vitest'

import { defineGlobalIgnore } from '../../src/configs'

describe('test ignores config', (test) => {
  test('global ignore', ({ expect }) => {
    const config = defineGlobalIgnore(['src/core.ts'])

    expect(Reflect.ownKeys(config)).toStrictEqual(['ignores', 'name'])
    expect(config.ignores).toStrictEqual(['src/core.ts'])
  })

  test('global ignore with ignore file', ({ expect }) => {
    const gitignore = fileURLToPath(new URL('../../.gitignore', import.meta.url))
    const config = defineGlobalIgnore(['src/core.ts'], gitignore)

    expect(Reflect.ownKeys(config)).toStrictEqual(['ignores', 'name'])
    expect(config.ignores).toMatchInlineSnapshot(`
      [
        "**/dist",
        "**/cache",
        "**/.cache",
        "**/coverage",
        "**/node_modules",
        "**/.eslintcache",
        ".changeset/README.md",
        "**/*.tsbuildinfo",
        "**/_fixtures",
        "**/.idea",
        ".vscode/**/*",
        "!.vscode/settings.json",
        "!.vscode/extensions.json",
        "src/configs/biome.ts",
        "src/*.rule.d.ts",
        "src/core.ts",
      ]
    `)
  })
})
