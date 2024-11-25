import { defineConfig } from 'vitest/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import pkg from './package.json'
import path from 'path'
import dtsPlugin from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  return ({
    define: mode === 'test' ? { global: 'window' } : {},
    server: {
      fs: {
        allow: ['..'],
      },
    },
    build: {
      minify: false,
      lib: {
        entry: './src/index.ts',
        fileName: format => `index.${format === 'cjs' ? 'cjs' : 'js'}`,
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
      tsconfigPaths({ projects: ['tsconfig.json'] }),
      vanillaExtractPlugin({
        identifiers: mode === 'development' || mode === 'test' ? ({ hash }) => `thorin-${hash}` : 'short',
      }),
      dtsPlugin({ entryRoot: path.resolve(__dirname),
        exclude: [
          'src/**/*.docs.mdx',
          'src/**/*.snippets.tsx',
          'src/**/*.test.ts*',
        ],
        beforeWriteFile: (filePath, content) => ({
          content: content.replace(/\/\.\.\/src/g, ''),
          filePath: filePath.replace('src', ''),
        }),
        staticImport: true,
        outDir: 'dist/types',
      }),
    ],
    test: {
      css: true,
      environment: 'jsdom',
      globals: true,
      coverage: {
        provider: 'v8',
      },
    },
  })
})
