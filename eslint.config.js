import eslint from '@eslint/js'
import globals from 'globals'
import { configs as tsConfigs } from 'typescript-eslint'

export default [
  {
    ignores: ['**/dist/', '**/node_modules/', '**/coverage/']
  },
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  eslint.configs.recommended,
  ...tsConfigs.recommended,
  {
    files: ['test/**', '*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  }
]
