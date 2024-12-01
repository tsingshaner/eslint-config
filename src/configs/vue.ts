import { mergeProcessors } from 'eslint-merge-processors'
import vuePlugin from 'eslint-plugin-vue'
import processorVueBlocks from 'eslint-processor-vue-blocks'
import { parser as tsParser } from 'typescript-eslint'
import * as vueParser from 'vue-eslint-parser'

import type { Linter } from 'eslint'

import { GLOB_VUE } from '../globs'
import { mergeRules } from '../merge-rules'

import type { VueRuleOptions } from '../vue.rule'

// @ts-expect-error is valid
export type VueConfig = Linter.Config<VueRuleOptions>
export interface VueConfigOverrideOptions {
  rules?: VueRuleOptions
  version?: 2 | 3
}

type ConfigName =
  | 'flat/base'
  | 'flat/essential'
  | 'flat/recommended'
  | 'flat/strongly-recommended'
  | 'flat/vue2-essential'
  | 'flat/vue2-recommended'
  | 'flat/vue2-strongly-recommended'
interface VuePlugin {
  configs: Record<ConfigName, VueConfig[]>
  processors: Record<'.vue' | 'vue', Linter.Processor>
}

export const defineVueConfig = ({ rules: ruleOverrides, version = 3 }: VueConfigOverrideOptions = {}): VueConfig[] => {
  const collection: ConfigName = version === 3 ? 'flat/recommended' : 'flat/vue2-recommended'
  const rules = mergeRules((vuePlugin as VuePlugin).configs[collection])

  return [
    {
      // This allows Vue plugin to work with auto imports
      // https://github.com/vuejs/eslint-plugin-vue/pull/2422
      languageOptions: {
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly'
        },
        sourceType: 'module'
      },
      name: 'qingshaner/vue',
      plugins: {
        vue: vuePlugin as VuePlugin
      }
    },
    {
      files: [GLOB_VUE],
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          extraFileExtensions: ['.vue'],
          parser: tsParser,
          sourceType: 'module'
        },
        sourceType: 'module'
      },
      name: 'qingshaner/vue/rules',
      plugins: {
        vue: vuePlugin as VuePlugin
      },
      processor: mergeProcessors([
        (vuePlugin as VuePlugin).processors['.vue'],
        processorVueBlocks({
          blocks: {
            customBlocks: true,
            script: false,
            styles: true,
            template: false
          }
        })
      ]),
      rules: {
        ...rules,
        ...ruleOverrides
      }
    }
  ]
}

export const vue = ({ rules, version = 3 }: VueConfigOverrideOptions = {}): VueConfig[] => {
  return defineVueConfig({
    rules: {
      'vue/array-bracket-spacing': ['error', 'never'],
      'vue/arrow-spacing': ['error', { after: true, before: true }],
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ]
        }
      ],
      'vue/block-order': ['warn', { order: ['script', 'template', 'style'] }],
      'vue/block-spacing': ['error', 'always'],
      'vue/block-tag-newline': ['error', { multiline: 'always', singleline: 'always' }],
      'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      'vue/comma-dangle': ['warn', 'never'],
      'vue/comma-spacing': ['warn', { after: true, before: false }],
      'vue/comma-style': ['warn', 'last'],
      'vue/component-tags-order': 'off',
      'vue/html-comment-content-spacing': ['warn', 'always', { exceptions: ['-'] }],
      'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
      'vue/keyword-spacing': ['error', { after: true, before: true }],
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      'vue/no-v-html': 'error',
      'vue/object-curly-newline': 'off',
      'vue/object-curly-spacing': ['warn', 'always'],
      'vue/object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
      'vue/operator-linebreak': ['error', 'before'],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/prefer-use-template-ref': 'warn',
      'vue/quote-props': ['error', 'consistent-as-needed'],
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/space-in-parens': ['error', 'never'],
      'vue/template-curly-spacing': 'error',
      ...rules
    },
    version
  })
}
