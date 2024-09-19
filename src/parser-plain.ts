/**
 * @link https://github.com/so1ve/eslint-parser-plain/blob/main/src/index.ts
 */
export const parserPlain = {
  meta: {
    name: 'eslint-parser-plain'
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program'
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: []
    }
  })
}
