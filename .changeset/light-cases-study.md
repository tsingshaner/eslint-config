---
"@qingshaner/eslint-config": minor
---

Bump dependencies
- `eslint-plugin-vue` to `10.0.0`
- `typescript-eslint` to `8.26.0`
- `vue-eslint-plugin` to `10.1.1`

## Rules

default vue rules add `vue/custom-event-name-casing` rule and remove legacy rule.

```diff
+ 'vue/custom-event-name-casing': ['warn', 'kebab-case']
- 'vue/component-tags-order': 'off'
```
