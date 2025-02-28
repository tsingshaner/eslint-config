import { exec } from 'node:child_process'
import { cp, rm, writeFile } from 'node:fs/promises'
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
  const configContent = `import { presetESLintConfig } from '../../../src'\n
export default presetESLintConfig(${JSON.stringify(config, null, 2)})\n`

  await writeFile(dir, configContent)
}

const runESLint = (configPath: string, runningDir: string) => `pnpm eslint -c ${configPath} ${runningDir} --fix`

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

  test('not disable biome', async ({ expect }) => {
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
        "error  '_t' is assigned a value but never used    no-unused-vars",
        "error  '_obj' is assigned a value but never used  no-unused-vars",
        '5 problems (5 errors, 0 warnings)'
      ]

      for (const msg of errorMessages) {
        expect(stderr).contain(msg)
      }
    }
  })
})
