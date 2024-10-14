import { fileURLToPath } from 'node:url'
import {
  mergeConfig,
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      silent: false,
      watch: false,
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: [
          '*.config.js',
          '*.config.ts',
          ...coverageConfigDefaults.exclude,
        ],
      },
    },
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./tests', import.meta.url)),
      },
    },
  }),
)
