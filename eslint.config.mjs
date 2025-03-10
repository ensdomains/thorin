import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import react from '@eslint-react/eslint-plugin'
import globals from 'globals'
import nextPlugin from '@next/eslint-plugin-next'
import { fixupPluginRules } from '@eslint/compat'

const baseConfig = tseslint.config(
  {
    files: ['*/src/**.{ts,tsx,js,mjs}', 'scripts/*.mjs', '*/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals['shared-node-browser'],
      },
    },
  },
  {
    ignores: ['docs/node_modules', 'docs/.next', '**/*.cjs', '**/*.js', '*/dist'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.recommended,
  react.configs.dom,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    jsx: true,
    semi: false,
  }),
  {
    settings: {
      'react-x': { version: 'detect' },
    },
    plugins: { 'react-x': react, stylistic },
    rules: {
      '@eslint-react/dom/no-missing-button-type': 'off',
      'stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@eslint-react/no-duplicate-key': 'warn',
    },
  },
  {
    files: ['docs/src/**/*.{ts,tsx}'],
    settings: {
      next: {
        rootDir: 'docs',
      },
    },
    plugins: {
      '@next/next': fixupPluginRules(nextPlugin),
    },
    rules: {
      // Next.js
      ...nextPlugin.configs.recommended.rules,
      '@next/next/no-img-element': 'off',
    },
  },
)

export default baseConfig
