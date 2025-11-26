import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import {defineConfig} from 'vitest/config'

/**
 * Vitest Configuration.
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000'
      }
    },
    exclude: [
      '**/.{idea,git,cache,output,temp}/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['**/*.{ts,tsx}'],
      exclude: [
        '**/*.config.*',
        '**/*.d.ts',
        '**/*.{spec,test}.{ts,tsx}',
        '**/{codegen,generated}.ts',
        '**/{scripts,test-utils,types}/**'
      ],
      reporter: ['text', 'json', 'html', 'lcov']
    }
  }
})
