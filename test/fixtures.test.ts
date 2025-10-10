import { exec } from 'node:child_process'
import { cp, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { promisify } from 'node:util'

import { describe } from 'vitest'

import type { PresetOptions } from '../src/preset'

const execAsync = promisify(exec)

const copySourceFiles = async (sourceDir: string, tempDir: string) => {
  await rm(tempDir, { force: true, recursive: true })
  await cp(sourceDir, tempDir, { force: true, recursive: true })
}

const generateESLintConfig = async (config: PresetOptions, dir: string) => {
  const configContent = `import { presetESLintConfig } from '../../../dist/index'\n
export default presetESLintConfig(${JSON.stringify(config, null, 2)})\n`

  await writeFile(dir, configContent)
}

const runESLint = (configPath: string, runningDir: string) => `pnpm eslint -c ${configPath} ${runningDir} --fix`
const _runBiome = (configPath: string, runningDir: string) =>
  `pnpm biome check --config-path=${configPath} ${runningDir} --fix`

describe.concurrent('fixtures', (test) => {
  const rootDir = resolve(import.meta.dirname, '..')
  const fixturesDir = resolve(rootDir, 'fixtures')
  const sourceDir = resolve(fixturesDir, 'source')
  const fixturesTempDir = resolve(fixturesDir, '_fixtures')

  test('all plugins', async ({ expect }) => {
    const groupDir = resolve(fixturesTempDir, 'all')
    const configPath = resolve(groupDir, 'eslint.config.mts')

    await copySourceFiles(sourceDir, groupDir)
    await generateESLintConfig(
      {
        a11y: true,
        biome: true,
        ignores: [resolve(groupDir, '.gitignore')],
        jsonc: true,
        perfectionist: true,
        prettier: true,
        react: true,
        typescript: [groupDir],
        unocss: true,
        vue: true
      },
      configPath
    )

    try {
      const { stderr, stdout } = await execAsync(runESLint(configPath, groupDir))
      expect(stderr).toBe('')
      expect(stdout).toBe('')
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  test('not disable biome rules', async ({ expect }) => {
    const groupDir = resolve(fixturesTempDir, 'not-disable-biome')

    await copySourceFiles(sourceDir, groupDir)
    await generateESLintConfig(
      {
        a11y: true,
        ignores: [resolve(groupDir, '.gitignore')],
        jsonc: true,
        perfectionist: true,
        prettier: true,
        react: true,
        typescript: [groupDir],
        unocss: true,
        vue: true
      },
      resolve(groupDir, 'eslint.config.mts')
    )

    const configPath = resolve(groupDir, 'eslint.config.mts')

    try {
      await execAsync(runESLint(configPath, groupDir))
      expect.fail('Should throw an error')
    } catch (error) {
      expect(error).ownProperty('stdout')

      const stderr = (error as { stdout: string }).stdout
      const errorMessages = [
        "error  '_obj' is assigned a value but never used  no-unused-vars",
        // @cspell:disable-next-line
        "rror  'nickname' is assigned a value but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars",
        "error  'a' is assigned a value but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars",
        '3 problems (3 errors, 0 warnings)'
      ]

      for (const msg of errorMessages) {
        expect(stderr).contain(msg)
      }
    }

    const formattedFilePath = resolve(groupDir, 'import-sort.ts')
    const formattedFile = await readFile(formattedFilePath, 'utf-8')
    await expect(formattedFile).toMatchFileSnapshot(
      resolve(import.meta.dirname, 'snapshots', 'not-disable-biome-import-sort.ts.txt')
    )
  })
})
