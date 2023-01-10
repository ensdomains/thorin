import macrosPlugin from 'vite-plugin-babel-macros'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import stylelintPlugin from 'vite-plugin-stylelint'

import pkg from './package.json'

export default defineConfig({
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
    },
  },
  plugins: [
    svgrPlugin({
      svgrOptions: {
        icon: true,
        svgo: true,
        replaceAttrValues: { '#000': 'currentColor', black: 'currentColor' },
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
    tsconfigPaths(),
    dts({
      exclude: [
        'src/**/*.docs.mdx',
        'src/**/*.snippets.tsx',
        'src/**/*.test.ts*',
      ],
      beforeWriteFile: (filePath, content) => ({
        content,
        filePath: filePath.replace('src', ''),
      }),
      compilerOptions: {
        baseUrl: './src/',
        emitDeclarationOnly: true,
        noEmit: false,
        paths: {
          '!/*': ['../*'],
          '@/*': ['./*'],
        },
      },
      outputDir: 'dist/types',
    }),
    macrosPlugin(),
    stylelintPlugin({
      include: './**/*.tsx',
      exclude: 'dist',
    }),
  ],
})
