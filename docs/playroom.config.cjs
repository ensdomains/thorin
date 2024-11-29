const path = require('path')

const { createVanillaExtractPlugin} = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin({identifiers: 'short'})
const { VanillaExtractPlugin} = require('@vanilla-extract/webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
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
    plugins: [new VanillaExtractPlugin() , new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: (filename) => {
            const pass = filename.endsWith('dist/thorin.css') || filename.endsWith('frameStyle.css')
            if (pass) {
              console.log('pass', filename)
            }
            return pass
          },
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
          ],
          sideEffects: true,
        },
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
        '@ensdomains/thorin': path.resolve(__dirname, '../components'),
      },
    },
  }),
}

module.exports = config