const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  components: './src/components.ts',
  baseUrl: '/playroom/',
  outputPath: '../docs/public/playroom',
  title: 'ENS',
  snippets: './src/snippets.ts',
  themes: './src/themes.ts',
  frameComponent: './src/FrameComponent.tsx',
  scope: './src/useScope.ts',
  typeScriptFiles: ['../components/src/**/*.{ts,tsx}'],
  widths: [320, 640, 768, 1024, 1280],
  openBrowser: false,
  port: 8082,
  iframeSandbox: 'allow-scripts allow-same-origin',

  webpackConfig: () => ({
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true,
      }),
    ],
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
      extensions: ['.js', '.ts', '.tsx'],
    },
  }),
}
