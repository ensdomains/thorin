/** @type {import('stylelint').Config} */
export default {
  extends: ['@stylistic/stylelint-config', 'stylelint-config-recommended'],
  rules: {
    '@stylistic/indentation': 2,
    '@stylistic/max-empty-lines': 1,
    '@stylistic/string-quotes': 'single',
  },
  ignorePatterns: ['**/*.tsx'],
}
