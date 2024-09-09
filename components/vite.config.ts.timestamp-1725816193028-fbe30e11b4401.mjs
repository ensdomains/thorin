// vite.config.ts
import { defineConfig } from "file:///Users/davidchu/projects/ens/thorin/node_modules/.pnpm/vitest@2.0.5_@types+node@22.5.0_jsdom@24.1.3_terser@5.31.6/node_modules/vitest/dist/config.js";
import { vanillaExtractPlugin } from "file:///Users/davidchu/projects/ens/thorin/node_modules/.pnpm/@vanilla-extract+vite-plugin@3.9.5_@types+node@22.5.0_babel-plugin-macros@3.1.0_terser@5.31.6_w4mww6o2fvain4y2lypfwha27e/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import tsconfigPaths from "file:///Users/davidchu/projects/ens/thorin/node_modules/.pnpm/vite-tsconfig-paths@4.0.1_typescript@5.5.4_vite@5.4.2_@types+node@22.5.0_terser@5.31.6_/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "@ensdomains/thorin",
  version: "1.0.0-beta.9",
  description: "A web3 native design system",
  main: "./dist/index.cjs",
  module: "./dist/index.js",
  type: "module",
  types: "./dist/types/index.d.ts",
  exports: {
    ".": {
      import: "./dist/index.js",
      require: "./dist/index.cjs",
      types: "./dist/types/index.d.ts"
    },
    "./style.css": {
      import: "./dist/style.css",
      require: "./dist/style.css"
    }
  },
  sideEffects: [
    "src/atoms/**/*",
    "src/theme/**/*",
    "*.css.ts"
  ],
  files: [
    "dist"
  ],
  repository: "ensdomains/thorin",
  license: "MIT",
  scripts: {
    build: "vite build",
    "build:watch": "vite build --watch --mode development",
    lint: "eslint . -c eslint.config.mjs",
    "lint:fix": "eslint . -c eslint.config.mjs --fix",
    "lint:types": "tsc --noEmit",
    prepack: "pnpm build",
    test: "vitest run",
    ver: "pnpm npm version"
  },
  dependencies: {
    "@vanilla-extract/sprinkles": "^1.6.3",
    clsx: "^1.1.1",
    "react-transition-state": "^2.1.1",
    "ts-pattern": "^4.3.0"
  },
  devDependencies: {
    "@testing-library/dom": "^9.3.3",
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.5.1",
    "@types/node": "^22.2.0",
    "@types/react": "^18.2.28",
    "@types/react-dom": "^18.2.13",
    "@types/testing-library__jest-dom": "^6.0.0",
    "@vanilla-extract/css": "^1.13.0",
    "@vanilla-extract/dynamic": "^2.0.3",
    "@vanilla-extract/recipes": "^0.5.0",
    "@vanilla-extract/vite-plugin": "^3.9.0",
    jsdom: "^24.1.1",
    react: "^18.0.0",
    "react-dom": "^18.0.0",
    vite: "^5.4.0",
    "vite-plugin-dts": "^4.0.2",
    "vite-tsconfig-paths": "^4.0.1",
    vitest: "^2.0.5"
  },
  peerDependencies: {
    react: "^18",
    "react-dom": "^18"
  }
};

// vite.config.ts
import path from "path";
import dtsPlugin from "file:///Users/davidchu/projects/ens/thorin/node_modules/.pnpm/vite-plugin-dts@4.0.3_@types+node@22.5.0_typescript@5.5.4_vite@5.4.2_@types+node@22.5.0_terser@5.31.6_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/davidchu/projects/ens/thorin/components";
var vite_config_default = defineConfig(({ mode }) => {
  return {
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
        identifiers: mode === "development" ? ({ hash }) => `thorin-${hash}` : "short"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RhdmlkY2h1L3Byb2plY3RzL2Vucy90aG9yaW4vY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RhdmlkY2h1L3Byb2plY3RzL2Vucy90aG9yaW4vY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGF2aWRjaHUvcHJvamVjdHMvZW5zL3Rob3Jpbi9jb21wb25lbnRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcbmltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBkdHNQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiAoe1xuICAgIHNlcnZlcjoge1xuICAgICAgZnM6IHtcbiAgICAgICAgYWxsb3c6IFsnLi4nXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgbWluaWZ5OiBmYWxzZSxcbiAgICAgIGxpYjoge1xuICAgICAgICBlbnRyeTogJy4vc3JjL2luZGV4LnRzJyxcbiAgICAgICAgZmlsZU5hbWU6IGZvcm1hdCA9PiBgaW5kZXguJHtmb3JtYXQgPT09ICdjanMnID8gJ2NqcycgOiAnanMnfWAsXG4gICAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMocGtnLnBlZXJEZXBlbmRlbmNpZXMpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJyEnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICB0c2NvbmZpZ1BhdGhzKHsgcHJvamVjdHM6IFsndHNjb25maWcuanNvbiddIH0pLFxuICAgICAgdmFuaWxsYUV4dHJhY3RQbHVnaW4oe1xuICAgICAgICBpZGVudGlmaWVyczogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyA/ICh7IGhhc2ggfSkgPT4gYHRob3Jpbi0ke2hhc2h9YCA6ICdzaG9ydCcsXG4gICAgICB9KSxcbiAgICAgIGR0c1BsdWdpbih7IGVudHJ5Um9vdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSksXG4gICAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgICAnc3JjLyoqLyouZG9jcy5tZHgnLFxuICAgICAgICAgICdzcmMvKiovKi5zbmlwcGV0cy50c3gnLFxuICAgICAgICAgICdzcmMvKiovKi50ZXN0LnRzKicsXG4gICAgICAgIF0sXG4gICAgICAgIGJlZm9yZVdyaXRlRmlsZTogKGZpbGVQYXRoLCBjb250ZW50KSA9PiAoe1xuICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQucmVwbGFjZSgvXFwvXFwuXFwuXFwvc3JjL2csICcnKSxcbiAgICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGgucmVwbGFjZSgnc3JjJywgJycpLFxuICAgICAgICB9KSxcbiAgICAgICAgc3RhdGljSW1wb3J0OiB0cnVlLFxuICAgICAgICBvdXREaXI6ICdkaXN0L3R5cGVzJyxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdGVzdDoge1xuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgY292ZXJhZ2U6IHtcbiAgICAgICAgcHJvdmlkZXI6ICd2OCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG59KVxuIiwgIntcbiAgXCJuYW1lXCI6IFwiQGVuc2RvbWFpbnMvdGhvcmluXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wLWJldGEuOVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSB3ZWIzIG5hdGl2ZSBkZXNpZ24gc3lzdGVtXCIsXG4gIFwibWFpblwiOiBcIi4vZGlzdC9pbmRleC5janNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvdHlwZXMvaW5kZXguZC50c1wiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9pbmRleC5qc1wiLFxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L2luZGV4LmNqc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC90eXBlcy9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9zdHlsZS5jc3NcIjoge1xuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3Qvc3R5bGUuY3NzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3Qvc3R5bGUuY3NzXCJcbiAgICB9XG4gIH0sXG4gIFwic2lkZUVmZmVjdHNcIjogW1xuICAgIFwic3JjL2F0b21zLyoqLypcIixcbiAgICBcInNyYy90aGVtZS8qKi8qXCIsXG4gICAgXCIqLmNzcy50c1wiXG4gIF0sXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiZGlzdFwiXG4gIF0sXG4gIFwicmVwb3NpdG9yeVwiOiBcImVuc2RvbWFpbnMvdGhvcmluXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZDp3YXRjaFwiOiBcInZpdGUgYnVpbGQgLS13YXRjaCAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtYyBlc2xpbnQuY29uZmlnLm1qc1wiLFxuICAgIFwibGludDpmaXhcIjogXCJlc2xpbnQgLiAtYyBlc2xpbnQuY29uZmlnLm1qcyAtLWZpeFwiLFxuICAgIFwibGludDp0eXBlc1wiOiBcInRzYyAtLW5vRW1pdFwiLFxuICAgIFwicHJlcGFja1wiOiBcInBucG0gYnVpbGRcIixcbiAgICBcInRlc3RcIjogXCJ2aXRlc3QgcnVuXCIsXG4gICAgXCJ2ZXJcIjogXCJwbnBtIG5wbSB2ZXJzaW9uXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHZhbmlsbGEtZXh0cmFjdC9zcHJpbmtsZXNcIjogXCJeMS42LjNcIixcbiAgICBcImNsc3hcIjogXCJeMS4xLjFcIixcbiAgICBcInJlYWN0LXRyYW5zaXRpb24tc3RhdGVcIjogXCJeMi4xLjFcIixcbiAgICBcInRzLXBhdHRlcm5cIjogXCJeNC4zLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L2RvbVwiOiBcIl45LjMuM1wiLFxuICAgIFwiQHRlc3RpbmctbGlicmFyeS9qZXN0LWRvbVwiOiBcIl42LjEuNFwiLFxuICAgIFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xNC4wLjBcIixcbiAgICBcIkB0ZXN0aW5nLWxpYnJhcnkvdXNlci1ldmVudFwiOiBcIl4xNC41LjFcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjIuMFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMjhcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4xM1wiLFxuICAgIFwiQHR5cGVzL3Rlc3RpbmctbGlicmFyeV9famVzdC1kb21cIjogXCJeNi4wLjBcIixcbiAgICBcIkB2YW5pbGxhLWV4dHJhY3QvY3NzXCI6IFwiXjEuMTMuMFwiLFxuICAgIFwiQHZhbmlsbGEtZXh0cmFjdC9keW5hbWljXCI6IFwiXjIuMC4zXCIsXG4gICAgXCJAdmFuaWxsYS1leHRyYWN0L3JlY2lwZXNcIjogXCJeMC41LjBcIixcbiAgICBcIkB2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW5cIjogXCJeMy45LjBcIixcbiAgICBcImpzZG9tXCI6IFwiXjI0LjEuMVwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMC4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMC4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeNC4wLjJcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4wLjFcIixcbiAgICBcInZpdGVzdFwiOiBcIl4yLjAuNVwiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJyZWFjdFwiOiBcIl4xOFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4XCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLG9CQUFvQjtBQUN6VixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLG1CQUFtQjs7O0FDRjFCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixNQUFRO0FBQUEsRUFDUixRQUFVO0FBQUEsRUFDVixNQUFRO0FBQUEs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
