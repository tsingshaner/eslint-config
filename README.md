# ESLint Config

A collection of ESLint configurations for different types of projects.

To use this configuration, it's highly recommended to include <a target="_blank" href="https://biomejs.dev"><img alt="biome logo" src="https://api.iconify.design/devicon:biome.svg"/> Biome</a> as part of your linter tool for optimal results.

<p align="center">
<a href="https://jsr.io/@qingshaner/eslint-config"><img src="https://jsr.io/badges/@qingshaner/eslint-config" alt="jsr package" /></a>
<a href="https://www.npmjs.com/@qingshaner/eslint-config" target="_blank"><img src="https://img.shields.io/npm/v/@qingshaner/eslint-config" alt="NPM Version" /></a>
<img alt="LICENSE" src="https://img.shields.io/github/license/tsingshaner/unocss-preset">
<a href="https://biomejs.dev"><img alt="Linted with Biome" src="https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome"></a>
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
  cspell: { configFile: resolve(ROOT, 'cspell.yaml') }, // optional
  ignores: [resolve(ROOT, '.gitignore')],
  jsonc: true,
  perfectionist: true,
  prettier: true,
  typescript: [ROOT],
  vue: true
})

```

Also provide a optional Biome configuration.

`// biome.json`
```json
{
  "$schema": "node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@qingshaner/eslint-config/biome"],
  "files": {
    "ignoreUnknown": true
  },
  "javascript": {
    "jsxRuntime": "transparent"
  }
}

```

You can import a cspell configuration file.

`// cspell.yaml`
```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json

import:
  - '@qingshaner/eslint-config/cspell'
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

### CSpell

[`@cspell/eslint-plugin`](https://cspell.org) is used to check spelling errors.

### JSON or JSONC

`antfu/sort/package-json` is used to sort `package.json`.
`antfu/sort/tsconfig-json` is used to sort `*.tsconfig.json`.

Include plugins

- [`eslint-plugin-jsonc`](https://www.npmjs.com/package/eslint-plugin-jsonc)


### Perfectionist

Sort import statements, sort object properties.

Include plugins

- [`eslint-plugin-perfectionist`](https://www.npmjs.com/package/eslint-plugin-perfectionist)

### Prettier

Format code with `Prettier`, if the file can't be formatted by `Biome`, it will be formatted by `Prettier`.

Include plugins

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

## ✨ Inspiration

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## 📄 License
MIT License © 2023-Present qingshaner
