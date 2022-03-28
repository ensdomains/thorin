import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

import { compilerOptions } from './tsconfig.json'

const config: Config.InitialOptions = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/index.ts',
    '!**/*.snippets.tsx',
    '!**/*.css.ts',
    '!**/icons/**',
    '!**/tokens/**',
  ],
  globals: {
    'ts-jest': {
      babelConfig: {
        plugins: ['babel-plugin-styled-components'],
      },
    },
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svg.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testRegex: '.*\\.test\\.(ts|tsx)$',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default config
