---
"@qingshaner/eslint-config": major
---

Remove `react` and `unocss` preset options along with `eslint-plugin-react` and `@unocss/eslint-plugin` support.

`PresetOptions.react`/`.unocss`, the `ReactConfig`/`UnoCSSConfig` and related types, and the `react()`/`unocss()` config exports are no longer available. JSX/TSX linting (a11y, TypeScript, import sorting, etc.) is unaffected; only the dedicated React and UnoCSS plugin rules were dropped.
