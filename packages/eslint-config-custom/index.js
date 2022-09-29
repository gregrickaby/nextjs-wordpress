module.exports = {
  extends: ['next/core-web-vitals', 'turbo', 'prettier'],
  rules: {
    'turbo/no-undeclared-env-vars': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'no-console': ['error', {allow: ['warn', 'error']}]
  }
}
