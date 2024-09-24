# ESLint Config

A collection of ![ESLint Logo](https://api.iconify.design/logos:eslint.svg) ESLint configurations for different types of projects.

To use this configuration, it's highly recommended to include <a target="_blank" href="https://biomejs.dev"><img alt="biome logo" src="https://api.iconify.design/devicon:biome.svg"/> Biome</a> as part of your linter tool for optimal results.

<p align="center">
<a href="https://www.npmjs.com/@qingshaner/eslint-config" target="_blank"><img src="https://img.shields.io/npm/v/@qingshaner/eslint-config" alt="NPM Version" /></a>
<a href="https://biomejs.dev" target="_blank"><img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome"></a>
<a href="https://biomejs.dev" target="_blank"><img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome"></a>
</p>

## 📦 Installation

```bash
npm install --save-dev @qingshaner/eslint-config
```

## 🚀 Usage

`// eslint.config.mjs`
```js
import { resolve } from 'node:path'

import { presetESLintConfig } from '@qingshaner/eslint-config'

const ROOT = import.meta.dirname // this require Node.js 20+

// Node.js < 20
// const ROOT = new URL('.', import.meta.url).pathname

export default presetESLintConfig({
  a11y: true,
  biome: true,
  ignores: [resolve(ROOT, '.gitignore')],
  jsonc: true,
  perfectionist: true,
  prettier: true,
  typescript: [ROOT],
  vue: true
})

```


## 🧩 Builtin Plugins

### A11y

Include plugins

- [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [`eslint-plugin-vuejs-accessibility`](https://www.npmjs.com/package/eslint-plugin-vuejs-accessibility)

### Biome

Disable `Biome` has implemented rules.

`react-plugin-refresh`, `react-plugin-react-hooks` is replaced by Biome.

JavaScript, TypeScript, CSS is formatted by Biome.

### JSON or JSONC

`antfu/sort/package-json` is used to sort `package.json`.
`antfu/sort/tsonfig-json` is used to sort `*.tsconfig.json`.

Include plugins

- [`eslint-plugin-jsonc`](https://www.npmjs.com/package/eslint-plugin-jsonc)


### Perfectionist

Sort import statements, sort object properties.

Include plugins

- [`eslint-plugin-perfectionist`](https://www.npmjs.com/package/eslint-plugin-perfectionist)

### Prettier

Format code with `Prettier`, if the file can't be formatted by `Biome`, it will be formatted by `Prettier`.

Incude plugins

- [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier)

### React

For `React` project.

Include plugins

- [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react)

### TypeScript

For `TypeScript` project.

Include plugins

- [`typescript-eslint`](https://www.npmjs.com/package/typescript-eslint)

### UnoCSS

Include plugins

- [`@unocss/eslint-plugin`](https://www.npmjs.com/package/@unocss/eslint-config)

### Vue

For `Vue2` | `Vue3` project.

Include plugins

- [`eslint-plugin-vue`](https://www.npmjs.com/package/eslint-plugin-vue)
- [`typescript-eslint`](https://www.npmjs.com/package/typescript-eslint)
- [`vue-eslint-parser`](https://www.npmjs.com/package/vue-eslint-parser)

## 📄 License
MIT License © 2023-Present qingshaner
