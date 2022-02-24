module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'no-console': ['error', {allow: ['warn', 'error']}],
    'prettier/prettier': 'error'
  }
}
