import baseConfig from "../eslint.config.mjs";

const config = [
  ...baseConfig,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'test/**/*.ts', 'test/**/*.js','test/**/*.tsx']
  }
]

export default config