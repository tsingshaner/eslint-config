import type { Linter } from 'eslint'

export const mergeRules = <Rules extends Linter.RulesRecord, T extends Linter.Config<Rules>>(configs: T | T[]) => {
  if (!Array.isArray(configs)) {
    return configs.rules
  }

  const rules: T['rules'] = {}
  for (const config of configs) {
    Object.assign(rules, config.rules)
  }
  return rules
}
