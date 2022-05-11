const path = require('path')

module.exports = {
  components: './src/playroom/components.ts',
  baseUrl: '/playroom/',
  outputPath: './public/playroom',
  title: 'ENS',
  snippets: './src/playroom/snippets.ts',
  themes: './src/playroom/themes.ts',
  frameComponent: './src/playroom/FrameComponent.tsx',
  scope: './src/playroom/useScope.ts',
  typeScriptFiles: ['../components/src/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
  widths: [320, 640, 768, 1024, 1280],
  openBrowser: false,
  port: 8082,
  iframeSandbox: 'allow-scripts allow-same-origin',

  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.svg', '.mdx'],
      alias: {
        '@': path.resolve(process.cwd(), '../components'),
      },
    },
  }),
}
