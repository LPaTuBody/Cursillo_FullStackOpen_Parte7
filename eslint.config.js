import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestGlobals from 'eslint-plugin-vitest-globals'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import configPrettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'eslint.config.js', 'vite.config.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitestGlobals.environments.env.globals,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // off es 0, warn es 1 y error es 2, acuérdate
      'no-unused-vars': [2, { varsIgnorePattern: '^[A-Z_]' }],
      'no-unused-expressions': 2,
      'no-use-before-define': 2,
      'no-unreachable': 2,
      'no-useless-assignment': 2,
      eqeqeq: 2,
      curly: [2, 'multi'],
      'object-shorthand': 2,
      'prefer-arrow-callback': 1,
      'prefer-destructuring': 1,
      'require-await': 1,
      // '@stylistic/indent': [2, 2],
      // '@stylistic/linebreak-style': ['error', 'unix'],
      // '@stylistic/quotes': ['error', 'single'],
      // '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-trailing-spaces': 2,
      // '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': [2, { before: true, after: true }],
    },
  },
  configPrettier,
])
