import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  {
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info']
        }
      ]
    }
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.*.js',
    '**/*.min.js',
    '**/.*cache/',
    '**/coverage/',
    '**/node_modules/',
    '**/public/'
  ])
])

export default eslintConfig
