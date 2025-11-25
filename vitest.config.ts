import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import {defineConfig} from 'vitest/config'

// https://vitejs.dev/config/
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
      '**/e2e/**',
      '**/vitest.config.*',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['**/*.{ts,tsx}'],
      exclude: [
        '**/*.config.*',
        '**/*.{spec,test}.{ts,tsx}',
        '**/app/**/{page,layout,manifest,robots,sitemap,global-not-found}.{ts,tsx}',
        '**/scripts/**',
        '**/test-utils/**',
        '**/types/**',
        '**/*.d.ts'
      ],
      reporter: ['text', 'json', 'html', 'lcov']
    }
  }
})
