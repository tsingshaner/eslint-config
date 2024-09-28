import { readFile } from 'node:fs/promises'

import pkg from '../../package.json'

/** * @param {string} path * @returns */
export const read = (path) => {
  const _obj = { a: 1, c: 2 }
  console.info(pkg)
  return readFile(path)
}
