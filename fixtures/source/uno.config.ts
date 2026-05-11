import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.([jt]sx|mdx?|html)($|\?)/, 'src/router/**/*.ts']
    }
  },
  presets: [
    presetAttributify({ prefix: 'v:' }),
    presetIcons({
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' }
    }),
    presetUno()
  ],
  rules: [],
  safelist: [],
  shortcuts: {},
  transformers: [transformerDirectives()],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('scrollbar:')) {
        return matcher
      }
      return {
        matcher: matcher.slice(10),
        selector: (s) => `${s}::-webkit-scrollbar`
      }
    },
    (matcher) => {
      if (!matcher.startsWith('scrollbar-thumb:')) {
        return matcher
      }
      return {
        matcher: matcher.slice(16),
        selector: (s) => `${s}::-webkit-scrollbar-thumb`
      }
    }
  ]
})
