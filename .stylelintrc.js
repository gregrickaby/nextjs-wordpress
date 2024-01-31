module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ],
    'no-descending-specificity': null,
    'selector-class-pattern': null
  }
}
