import { defineConfig } from 'vitest/config'
import svgrPlugin from 'vite-plugin-svgr'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

import pkg from './package.json'
import path from 'path'

export default defineConfig({
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    lib: {
      entry: './src/components/index.ts',
      fileName: format => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname),
      },
      {
        find: '!',
        replacement: path.resolve(__dirname, '..'),
      },
    ],
  },
  plugins: [
    vanillaExtractPlugin({
      identifiers: 'short',
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        svgo: true,
        replaceAttrValues: { '#000': 'currentColor', 'black': 'currentColor' },
        svgProps: {
          focusable: 'false',
          shapeRendering: 'geometricPrecision',
        },
        svgoConfig: {
          multipass: true,
          removeViewBox: false,
          removeDimensions: true,
        },
        titleProp: true,
        jsx: {
          babelConfig: {
            plugins: [
              [
                '@svgr/babel-plugin-remove-jsx-attribute',
                {
                  elements: ['path'],
                  attributes: ['className', 'strokeWidth'],
                },
              ],
            ],
          },
        },
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    // macrosPlugin(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
