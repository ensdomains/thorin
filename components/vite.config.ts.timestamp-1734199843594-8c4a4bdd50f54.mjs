// vite.config.ts
import { defineConfig } from "file:///Users/pasha/Coding/thorin/node_modules/.pnpm/vitest@2.1.8_@types+node@22.9.0_jsdom@25.0.1_terser@5.37.0/node_modules/vitest/dist/config.js";
import { vanillaExtractPlugin } from "file:///Users/pasha/Coding/thorin/node_modules/.pnpm/@vanilla-extract+vite-plugin@4.0.18_@types+node@22.9.0_babel-plugin-macros@3.1.0_terser@5.37._jsof7fsuwnfo4m6ziwtdx6uoia/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import tsconfigPaths from "file:///Users/pasha/Coding/thorin/node_modules/.pnpm/vite-tsconfig-paths@5.1.3_typescript@5.7.2_vite@5.4.11_@types+node@22.9.0_terser@5.37.0_/node_modules/vite-tsconfig-paths/dist/index.js";

// package.json
var package_default = {
  name: "@ensdomains/thorin",
  version: "1.0.0-beta.15",
  description: "A web3 native design system",
  type: "module",
  main: "./dist/index.cjs",
  module: "./dist/index.js",
  types: "./dist/types/index.d.ts",
  exports: {
    ".": {
      types: "./dist/types/index.d.ts",
      import: "./dist/index.js",
      require: "./dist/index.cjs"
    },
    "./dist/*.css": "./dist/*.css"
  },
  sideEffects: [
    "src/atoms/**/*",
    "src/theme/**/*",
    "*.css.ts"
  ],
  files: [
    "dist"
  ],
  engines: {
    node: ">=20"
  },
  repository: "ensdomains/thorin",
  license: "MIT",
  scripts: {
    build: "vite build",
    "build:watch": "vite build --watch --mode development",
    "lint:types": "tsc --noEmit",
    prepack: "pnpm build",
    test: "vitest run",
    "test:coverage": "vitest run --coverage",
    ver: "npm version"
  },
  dependencies: {
    "@vanilla-extract/sprinkles": "^1.6.3",
    clsx: "^2.1.1",
    "react-transition-state": "^2.1.3",
    "ts-pattern": "^5.5.0"
  },
  devDependencies: {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^22.9.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vanilla-extract/css": "^1.16.0",
    "@vanilla-extract/dynamic": "^2.1.2",
    "@vanilla-extract/recipes": "^0.5.5",
    "@vanilla-extract/vite-plugin": "^4.0.18",
    "@vitest/coverage-v8": "^2.1.8",
    jsdom: "^25.0.1",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    vite: "^5.4.11",
    "vite-plugin-dts": "^4.3.0",
    "vite-tsconfig-paths": "^5.1.3",
    vitest: "^2.1.8"
  },
  peerDependencies: {
    react: "^18",
    "react-dom": "^18"
  }
};

// vite.config.ts
import path from "path";
import dtsPlugin from "file:///Users/pasha/Coding/thorin/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.9.0_rollup@4.28.1_typescript@5.7.2_vite@5.4.11_@types+node@22.9.0_terser@5.37.0_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/pasha/Coding/thorin/components";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    define: mode === "test" ? { global: "window" } : {},
    server: {
      fs: {
        allow: [".."]
      }
    },
    build: {
      minify: false,
      lib: {
        entry: "./src/index.ts",
        fileName: (format) => `index.${format === "cjs" ? "cjs" : "js"}`,
        formats: ["es", "cjs"]
      },
      rollupOptions: {
        external: Object.keys(package_default.peerDependencies)
      }
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__vite_injected_original_dirname)
        },
        {
          find: "!",
          replacement: path.resolve(__vite_injected_original_dirname, "..")
        }
      ]
    },
    plugins: [
      tsconfigPaths({ projects: ["tsconfig.json"] }),
      vanillaExtractPlugin({
        identifiers: mode === "development" || mode === "test" ? ({ hash }) => `thorin-${hash}` : "short"
      }),
      dtsPlugin({
        entryRoot: path.resolve(__vite_injected_original_dirname),
        exclude: [
          "src/**/*.docs.mdx",
          "src/**/*.snippets.tsx",
          "src/**/*.test.ts*"
        ],
        beforeWriteFile: (filePath, content) => ({
          content: content.replace(/\/\.\.\/src/g, ""),
          filePath: filePath.replace("src", "")
        }),
        staticImport: true,
        outDir: "dist/types"
      })
    ],
    test: {
      css: true,
      environment: "jsdom",
      globals: true,
      coverage: {
        provider: "v8"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3Bhc2hhL0NvZGluZy90aG9yaW4vY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3Bhc2hhL0NvZGluZy90aG9yaW4vY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcGFzaGEvQ29kaW5nL3Rob3Jpbi9jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcbmltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBkdHNQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiAoe1xuICAgIGRlZmluZTogbW9kZSA9PT0gJ3Rlc3QnID8geyBnbG9iYWw6ICd3aW5kb3cnIH0gOiB7fSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGZzOiB7XG4gICAgICAgIGFsbG93OiBbJy4uJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG1pbmlmeTogZmFsc2UsXG4gICAgICBsaWI6IHtcbiAgICAgICAgZW50cnk6ICcuL3NyYy9pbmRleC50cycsXG4gICAgICAgIGZpbGVOYW1lOiBmb3JtYXQgPT4gYGluZGV4LiR7Zm9ybWF0ID09PSAnY2pzJyA/ICdjanMnIDogJ2pzJ31gLFxuICAgICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxuICAgICAgfSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKHBrZy5wZWVyRGVwZW5kZW5jaWVzKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0AnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICchJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJyksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdHNjb25maWdQYXRocyh7IHByb2plY3RzOiBbJ3RzY29uZmlnLmpzb24nXSB9KSxcbiAgICAgIHZhbmlsbGFFeHRyYWN0UGx1Z2luKHtcbiAgICAgICAgaWRlbnRpZmllcnM6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcgfHwgbW9kZSA9PT0gJ3Rlc3QnID8gKHsgaGFzaCB9KSA9PiBgdGhvcmluLSR7aGFzaH1gIDogJ3Nob3J0JyxcbiAgICAgIH0pLFxuICAgICAgZHRzUGx1Z2luKHsgZW50cnlSb290OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lKSxcbiAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICdzcmMvKiovKi5kb2NzLm1keCcsXG4gICAgICAgICAgJ3NyYy8qKi8qLnNuaXBwZXRzLnRzeCcsXG4gICAgICAgICAgJ3NyYy8qKi8qLnRlc3QudHMqJyxcbiAgICAgICAgXSxcbiAgICAgICAgYmVmb3JlV3JpdGVGaWxlOiAoZmlsZVBhdGgsIGNvbnRlbnQpID0+ICh7XG4gICAgICAgICAgY29udGVudDogY29udGVudC5yZXBsYWNlKC9cXC9cXC5cXC5cXC9zcmMvZywgJycpLFxuICAgICAgICAgIGZpbGVQYXRoOiBmaWxlUGF0aC5yZXBsYWNlKCdzcmMnLCAnJyksXG4gICAgICAgIH0pLFxuICAgICAgICBzdGF0aWNJbXBvcnQ6IHRydWUsXG4gICAgICAgIG91dERpcjogJ2Rpc3QvdHlwZXMnLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB0ZXN0OiB7XG4gICAgICBjc3M6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBjb3ZlcmFnZToge1xuICAgICAgICBwcm92aWRlcjogJ3Y4JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSlcbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJAZW5zZG9tYWlucy90aG9yaW5cIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjAtYmV0YS4xNVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSB3ZWIzIG5hdGl2ZSBkZXNpZ24gc3lzdGVtXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcIm1haW5cIjogXCIuL2Rpc3QvaW5kZXguY2pzXCIsXG4gIFwibW9kdWxlXCI6IFwiLi9kaXN0L2luZGV4LmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvdHlwZXMvaW5kZXguZC50c1wiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3R5cGVzL2luZGV4LmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2luZGV4LmpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvaW5kZXguY2pzXCJcbiAgICB9LFxuICAgIFwiLi9kaXN0LyouY3NzXCI6IFwiLi9kaXN0LyouY3NzXCJcbiAgfSxcbiAgXCJzaWRlRWZmZWN0c1wiOiBbXG4gICAgXCJzcmMvYXRvbXMvKiovKlwiLFxuICAgIFwic3JjL3RoZW1lLyoqLypcIixcbiAgICBcIiouY3NzLnRzXCJcbiAgXSxcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJkaXN0XCJcbiAgXSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCI+PTIwXCJcbiAgfSxcbiAgXCJyZXBvc2l0b3J5XCI6IFwiZW5zZG9tYWlucy90aG9yaW5cIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImJ1aWxkOndhdGNoXCI6IFwidml0ZSBidWlsZCAtLXdhdGNoIC0tbW9kZSBkZXZlbG9wbWVudFwiLFxuICAgIFwibGludDp0eXBlc1wiOiBcInRzYyAtLW5vRW1pdFwiLFxuICAgIFwicHJlcGFja1wiOiBcInBucG0gYnVpbGRcIixcbiAgICBcInRlc3RcIjogXCJ2aXRlc3QgcnVuXCIsXG4gICAgXCJ0ZXN0OmNvdmVyYWdlXCI6IFwidml0ZXN0IHJ1biAtLWNvdmVyYWdlXCIsXG4gICAgXCJ2ZXJcIjogXCJucG0gdmVyc2lvblwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB2YW5pbGxhLWV4dHJhY3Qvc3ByaW5rbGVzXCI6IFwiXjEuNi4zXCIsXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4xXCIsXG4gICAgXCJyZWFjdC10cmFuc2l0aW9uLXN0YXRlXCI6IFwiXjIuMS4zXCIsXG4gICAgXCJ0cy1wYXR0ZXJuXCI6IFwiXjUuNS4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHRlc3RpbmctbGlicmFyeS9kb21cIjogXCJeMTAuNC4wXCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L2plc3QtZG9tXCI6IFwiXjYuNi4zXCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3JlYWN0XCI6IFwiXjE2LjAuMVwiLFxuICAgIFwiQHRlc3RpbmctbGlicmFyeS91c2VyLWV2ZW50XCI6IFwiXjE0LjUuMlwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjIuOS4wXCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4xMlwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4zLjFcIixcbiAgICBcIkB2YW5pbGxhLWV4dHJhY3QvY3NzXCI6IFwiXjEuMTYuMFwiLFxuICAgIFwiQHZhbmlsbGEtZXh0cmFjdC9keW5hbWljXCI6IFwiXjIuMS4yXCIsXG4gICAgXCJAdmFuaWxsYS1leHRyYWN0L3JlY2lwZXNcIjogXCJeMC41LjVcIixcbiAgICBcIkB2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW5cIjogXCJeNC4wLjE4XCIsXG4gICAgXCJAdml0ZXN0L2NvdmVyYWdlLXY4XCI6IFwiXjIuMS44XCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yNS4wLjFcIixcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxuICAgIFwidml0ZVwiOiBcIl41LjQuMTFcIixcbiAgICBcInZpdGUtcGx1Z2luLWR0c1wiOiBcIl40LjMuMFwiLFxuICAgIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiOiBcIl41LjEuM1wiLFxuICAgIFwidml0ZXN0XCI6IFwiXjIuMS44XCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInJlYWN0XCI6IFwiXjE4XCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMThcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsb0JBQW9CO0FBQzlULFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sbUJBQW1COzs7QUNGMUI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxFQUNmLE1BQVE7QUFBQSxFQUNSLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLE9BQVM7QUFBQSxFQUNULFNBQVc7QUFBQSxJ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
