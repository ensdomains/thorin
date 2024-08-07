import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import react from '@eslint-react/eslint-plugin'
import globals from 'globals'
import nextPlugin from '@next/eslint-plugin-next'
import { fixupPluginRules } from '@eslint/compat'

const baseConfig = tseslint.config(
  {
    files: ['*/src/**.{ts,tsx,js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },
  },
  {
    ignores: ['docs/node_modules', 'docs/dist', 'components', 'docs/.next', '**/*.cjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    jsx: true,
    semi: false,
  }),
  {
    files: ['docs/src/**/*.{ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: 'docs',
      },
    },
    plugins: {
      '@next/next': fixupPluginRules(nextPlugin),
      stylistic,
      react,
    },
    rules: {
      // Next.js
      ...nextPlugin.configs.recommended.rules,
      '@next/next/no-img-element': 'off',
      'stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
)

export default baseConfig
