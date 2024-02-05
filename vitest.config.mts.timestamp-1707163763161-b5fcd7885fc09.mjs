// vitest.config.mts
import { fileURLToPath } from "node:url";
import { mergeConfig } from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/vite/dist/node/index.js";
import { configDefaults, defineConfig as defineConfig2 } from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/vitest/dist/config.js";

// vite.config.mts
import vue from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import typescript2 from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/rollup-plugin-typescript2/dist/rollup-plugin-typescript2.cjs.js";
import { defineConfig } from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/vite/dist/node/index.js";
import cssInjectedByJsPlugin from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import dts from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/vite-plugin-dts/dist/index.mjs";
import vuetify from "file:///home/holtgrem_c/Development/reev/frontend/node_modules/vite-plugin-vuetify/dist/index.mjs";
var __vite_injected_original_dirname = "/home/holtgrem_c/Development/reev/frontend/src/ext/reev-frontend-lib";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vuetify(),
    dts({
      insertTypesEntry: true
    }),
    cssInjectedByJsPlugin(),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true
        }
      },
      exclude: ["vite.config.mts"]
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/main.ts",
      name: "reevFrontendLib",
      formats: ["umd", "es", "cjs"],
      // order is important, see: https://github.com/rollup/rollup/issues/5095#issuecomment-1683264619
      fileName: (format) => `reev-frontend-lib.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: path.resolve(__vite_injected_original_dirname, "src/main.ts")
      },
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "main.css")
            return "reev-frontend-lib.css";
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  }
});

// vitest.config.mts
var __vite_injected_original_import_meta_url = "file:///home/holtgrem_c/Development/reev/frontend/src/ext/reev-frontend-lib/vitest.config.mts";
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      setupFiles: ["./src/vitest.setup.ts"],
      server: {
        deps: {
          inline: ["vuetify", "vitest-canvas-mock"]
        }
      },
      coverage: {
        all: true,
        provider: "istanbul",
        reporter: ["text", "html", "clover", "json"],
        include: [
          "src/router/**/*.ts",
          "src/router/*.ts",
          "src/lib/**/*.ts",
          "src/lib/*/*.ts",
          "src/stores/**/*.ts",
          "src/stores/*/*.ts",
          "src/components/**/*.{vue,ts}",
          "src/components/*/*.ts",
          "src/views/**/*.{vue,ts}",
          "src/views/*/*.ts"
        ],
        exclude: ["**/*.spec.ts", "**/*.stories.ts"]
      },
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
      testTransformMode: {
        web: ["**/*.{jsx,tsx}"]
      },
      testTimeout: 1e4
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5tdHMiLCAidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvaG9sdGdyZW1fYy9EZXZlbG9wbWVudC9yZWV2L2Zyb250ZW5kL3NyYy9leHQvcmVldi1mcm9udGVuZC1saWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2hvbHRncmVtX2MvRGV2ZWxvcG1lbnQvcmVldi9mcm9udGVuZC9zcmMvZXh0L3JlZXYtZnJvbnRlbmQtbGliL3ZpdGVzdC5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2hvbHRncmVtX2MvRGV2ZWxvcG1lbnQvcmVldi9mcm9udGVuZC9zcmMvZXh0L3JlZXYtZnJvbnRlbmQtbGliL3ZpdGVzdC5jb25maWcubXRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY29uZmlnRGVmYXVsdHMsIGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnXG5cbmltcG9ydCB2aXRlQ29uZmlnIGZyb20gJy4vdml0ZS5jb25maWcubXRzJ1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcbiAgdml0ZUNvbmZpZyxcbiAgZGVmaW5lQ29uZmlnKHtcbiAgICB0ZXN0OiB7XG4gICAgICBzZXR1cEZpbGVzOiBbJy4vc3JjL3ZpdGVzdC5zZXR1cC50cyddLFxuICAgICAgc2VydmVyOiB7XG4gICAgICAgIGRlcHM6IHtcbiAgICAgICAgICBpbmxpbmU6IFsndnVldGlmeScsICd2aXRlc3QtY2FudmFzLW1vY2snXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY292ZXJhZ2U6IHtcbiAgICAgICAgYWxsOiB0cnVlLFxuICAgICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJyxcbiAgICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdodG1sJywgJ2Nsb3ZlcicsICdqc29uJ10sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAnc3JjL3JvdXRlci8qKi8qLnRzJyxcbiAgICAgICAgICAnc3JjL3JvdXRlci8qLnRzJyxcbiAgICAgICAgICAnc3JjL2xpYi8qKi8qLnRzJyxcbiAgICAgICAgICAnc3JjL2xpYi8qLyoudHMnLFxuICAgICAgICAgICdzcmMvc3RvcmVzLyoqLyoudHMnLFxuICAgICAgICAgICdzcmMvc3RvcmVzLyovKi50cycsXG4gICAgICAgICAgJ3NyYy9jb21wb25lbnRzLyoqLyoue3Z1ZSx0c30nLFxuICAgICAgICAgICdzcmMvY29tcG9uZW50cy8qLyoudHMnLFxuICAgICAgICAgICdzcmMvdmlld3MvKiovKi57dnVlLHRzfScsXG4gICAgICAgICAgJ3NyYy92aWV3cy8qLyoudHMnXG4gICAgICAgIF0sXG4gICAgICAgIGV4Y2x1ZGU6IFsnKiovKi5zcGVjLnRzJywgJyoqLyouc3Rvcmllcy50cyddXG4gICAgICB9LFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBleGNsdWRlOiBbLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSwgJ2UyZS8qJ10sXG4gICAgICByb290OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICB0ZXN0VHJhbnNmb3JtTW9kZToge1xuICAgICAgICB3ZWI6IFsnKiovKi57anN4LHRzeH0nXVxuICAgICAgfSxcbiAgICAgIHRlc3RUaW1lb3V0OiAxMDAwMFxuICAgIH1cbiAgfSkgYXMgdHlwZW9mIHZpdGVDb25maWdcbilcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvaG9sdGdyZW1fYy9EZXZlbG9wbWVudC9yZWV2L2Zyb250ZW5kL3NyYy9leHQvcmVldi1mcm9udGVuZC1saWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2hvbHRncmVtX2MvRGV2ZWxvcG1lbnQvcmVldi9mcm9udGVuZC9zcmMvZXh0L3JlZXYtZnJvbnRlbmQtbGliL3ZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9ob2x0Z3JlbV9jL0RldmVsb3BtZW50L3JlZXYvZnJvbnRlbmQvc3JjL2V4dC9yZWV2LWZyb250ZW5kLWxpYi92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB0eXBlc2NyaXB0MiBmcm9tICdyb2xsdXAtcGx1Z2luLXR5cGVzY3JpcHQyJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tY3NzLWluamVjdGVkLWJ5LWpzJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVldGlmeSgpLFxuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlXG4gICAgfSksXG4gICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksXG4gICAgdHlwZXNjcmlwdDIoe1xuICAgICAgY2hlY2s6IGZhbHNlLFxuICAgICAgaW5jbHVkZTogWydzcmMvY29tcG9uZW50cy8qKi8qLnZ1ZSddLFxuICAgICAgdHNjb25maWdPdmVycmlkZToge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAgICAgICBzb3VyY2VNYXA6IHRydWUsXG4gICAgICAgICAgZGVjbGFyYXRpb246IHRydWUsXG4gICAgICAgICAgZGVjbGFyYXRpb25NYXA6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV4Y2x1ZGU6IFsndml0ZS5jb25maWcubXRzJ11cbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBsaWI6IHtcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50c1xuICAgICAgZW50cnk6ICdzcmMvbWFpbi50cycsXG4gICAgICBuYW1lOiAncmVldkZyb250ZW5kTGliJyxcbiAgICAgIGZvcm1hdHM6IFsndW1kJywgJ2VzJywgJ2NqcyddLCAvLyBvcmRlciBpcyBpbXBvcnRhbnQsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzUwOTUjaXNzdWVjb21tZW50LTE2ODMyNjQ2MTlcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgcmVldi1mcm9udGVuZC1saWIuJHtmb3JtYXR9LmpzYFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGQgbm90IGJlIGJ1bmRsZWRcbiAgICAgIC8vIGludG8geW91ciBsaWJyYXJ5XG4gICAgICBpbnB1dDoge1xuICAgICAgICBtYWluOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL21haW4udHMnKVxuICAgICAgfSxcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSAnbWFpbi5jc3MnKSByZXR1cm4gJ3JlZXYtZnJvbnRlbmQtbGliLmNzcydcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1ksU0FBUyxxQkFBcUI7QUFDbGEsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxnQkFBZ0IsZ0JBQUFBLHFCQUFvQjs7O0FDRm1WLE9BQU8sU0FBUztBQUNoWixZQUFZLFVBQVU7QUFDdEIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQU5wQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixRQUFRO0FBQUEsSUFDUixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsSUFDRCxzQkFBc0I7QUFBQSxJQUN0QixZQUFZO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUMseUJBQXlCO0FBQUEsTUFDbkMsa0JBQWtCO0FBQUEsUUFDaEIsaUJBQWlCO0FBQUEsVUFDZixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxhQUFhO0FBQUEsVUFDYixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVMsQ0FBQyxpQkFBaUI7QUFBQSxJQUM3QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2QsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsT0FBTyxNQUFNLEtBQUs7QUFBQTtBQUFBLE1BQzVCLFVBQVUsQ0FBQyxXQUFXLHFCQUFxQixNQUFNO0FBQUEsSUFDbkQ7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBO0FBQUEsTUFHYixPQUFPO0FBQUEsUUFDTCxNQUFXLGFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzdDO0FBQUEsTUFDQSxVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVM7QUFBWSxtQkFBTztBQUMxQyxpQkFBTyxVQUFVO0FBQUEsUUFDbkI7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFVLGFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRC9Ea1AsSUFBTSwyQ0FBMkM7QUFNcFMsSUFBTyx3QkFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBQyxjQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsTUFDSixZQUFZLENBQUMsdUJBQXVCO0FBQUEsTUFDcEMsUUFBUTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osUUFBUSxDQUFDLFdBQVcsb0JBQW9CO0FBQUEsUUFDMUM7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixLQUFLO0FBQUEsUUFDTCxVQUFVO0FBQUEsUUFDVixVQUFVLENBQUMsUUFBUSxRQUFRLFVBQVUsTUFBTTtBQUFBLFFBQzNDLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBUyxDQUFDLGdCQUFnQixpQkFBaUI7QUFBQSxNQUM3QztBQUFBLE1BQ0EsYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLEdBQUcsZUFBZSxTQUFTLE9BQU87QUFBQSxNQUM1QyxNQUFNLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBLE1BQ2xELG1CQUFtQjtBQUFBLFFBQ2pCLEtBQUssQ0FBQyxnQkFBZ0I7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsYUFBYTtBQUFBLElBQ2Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyJdCn0K
