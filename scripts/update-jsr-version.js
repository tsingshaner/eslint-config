import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import pkg from '../package.json' with { type: 'json' }

const jsrPath = fileURLToPath(import.meta.resolve('../jsr.json'))
const jsrConfig = readFileSync(jsrPath, 'utf8').replace(/"version": ".*"/, `"version": "${pkg.version}"`)
writeFileSync(jsrPath, jsrConfig)
