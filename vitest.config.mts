import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

import viteConfig from './vite.config.mts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['./src/vitest.setup.ts'],
      server: {
        deps: {
          inline: ['vuetify', 'vitest-canvas-mock']
        }
      },
      coverage: {
        provider: 'istanbul',
        include: ['src/{lib,components}/*.{js,jsx,ts,tsx,vue}'],
        exclude: ["*.spec.{js,jsx,ts,tsx,vue}", ".stories.{js,jsx,ts,tsx,vue}"]
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*', "**/pbs/**"],
      root: fileURLToPath(new URL('./', import.meta.url)),
      testTransformMode: {
        web: ["**/*.{jsx,tsx}"]
      },
      testTimeout: 10000
    }
  }) as typeof viteConfig
)
