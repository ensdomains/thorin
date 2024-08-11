import { defineConfig } from 'vitest/config'
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
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
