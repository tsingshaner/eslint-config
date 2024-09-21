# ![ESLint Logo](https://api.iconify.design/logos:eslint.svg) ESLint Config

A collection of ESLint configurations for different types of projects.

To use this configuration, it's highly recommended to include <a target="_blank" href="https://biomejs.dev"><img alt="biome logo" src="https://api.iconify.design/devicon:biome.svg"/> Biome</a> as part of your linter tool for optimal results.



<p align="center">
<a href="https://www.npmjs.com/@qingshaner/eslint-config" target="_blank"><img src="https://img.shields.io/npm/v/@qingshaner/eslint-config" alt="NPM Version" /></a>
<a href="https://biomejs.dev" target="_blank"><img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome"></a>
<a href="https://biomejs.dev" target="_blank"><img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome"></a>
</p>

## 🧩 Plugins

### A11y

Plugin includes
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-vuejs-accessibility`

### Biome

Disable `Biome` has implemented rules.

`react-plugin-refresh`, `react-plugin-react-hooks` is replaced by Biome.

JavaScript, TypeScript, CSS is formatted by Biome.

### JSON or JSONC

`eslint-plugin-jsonc` is included.

`antfu/sort/package-json` is used to sort `package.json`.
`antfu/sort/tsonfig-json` is used to sort `*.tsconfig.json`.

### Perfectionist

`eslint-plugin-perfectionist` is included.

Sort import statements, sort object properties.

### Prettier

Plugin includes

`eslint-plugin-prettier`

Format code with `Prettier`, if the file can't be formatted by `Biome`, it will be formatted by `Prettier`.

### React

`eslint-plugin-react` is included.

For `React` project.

### TypeScript

Plugin includes

`@typescript-eslint/eslint-plugin`
`@typescript-eslint/parser`

For `TypeScript` project.

### Vue

`eslint-plugin-vue` is included.

For `Vue2` | `Vue3` project.
