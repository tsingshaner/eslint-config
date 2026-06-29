---
"@qingshaner/eslint-config": major
---

- Remove JSONC config support. The `jsonc` and `defineJSONCConfig` exports, the `JSONCConfig` type, and the `eslint-plugin-jsonc` dependency are no longer available. The `PresetOptions` type no longer includes a `jsonc` option.
- Add `@eslint/config-helpers` as a dependency; `defineGlobalIgnore` now uses `convertIgnorePatternToMinimatch` and `includeIgnoreFile` from that package.
- Update dependencies: `globals`, `typescript-eslint`, `@biomejs/biome`, `eslint`, `knip`.
