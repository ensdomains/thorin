import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import react from '@eslint-react/eslint-plugin'
import globals from 'globals'

const baseConfig = tseslint.config(
  {
    ignores: ['node_modules', 'dist', '.next'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
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
)

export default baseConfig
