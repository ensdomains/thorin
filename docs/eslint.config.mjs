import config  from "../eslint.config.mjs"

import nextPlugin from '@next/eslint-plugin-next';
import react from '@eslint-react/eslint-plugin'
import { fixupPluginRules } from '@eslint/compat';


const docsConfig = [
  ...config,
     {
  files: ['docs/**/*.ts', 'docs/**/*.tsx'],
  settings: {
    react: {
      version: 'detect',
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
}
]