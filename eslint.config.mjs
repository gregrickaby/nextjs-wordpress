import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

const config = [
  {
    ignores: [
      '.*.js',
      '**/*.min.js',
      '**/.*cache/',
      '**/.next/',
      '**/build/',
      '**/coverage/',
      '**/node_modules/',
      '**/public/'
    ]
  },
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info']
        }
      ]
    }
  }
]

export default config
