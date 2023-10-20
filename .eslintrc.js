module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    '@next/next/no-img-element': 'off',
    'func-style': ['error', 'declaration'],
    'no-console': ['error', {allow: ['warn', 'error']}]
  }
}
