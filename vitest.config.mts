import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

import viteConfig from './vite.config.mts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['jsdom-worker', './src/vitest.setup.ts'],
      server: {
        deps: {
          inline: ['vuetify', 'vitest-canvas-mock']
        }
      },
      coverage: {
        all: true,
        provider: 'istanbul',
        reporter: ['text', 'html', 'clover', 'json'],
        include: [
          'src/router/**/*.ts',
          'src/router/*.ts',
          'src/lib/**/*.ts',
          'src/lib/*/*.ts',
          'src/stores/**/*.ts',
          'src/stores/*/*.ts',
          'src/components/**/*.{vue,ts}',
          'src/components/*/*.ts',
          'src/views/**/*.{vue,ts}',
          'src/views/*/*.ts'
        ],
        exclude: ['**/*.spec.ts', '**/*.stories.ts']
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      testTransformMode: {
        web: ['**/*.{jsx,tsx}']
      },
      testTimeout: 10000
    }
  }) as typeof viteConfig
)
