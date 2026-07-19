const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')
const nextTypescript = require('eslint-config-next/typescript')

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { ignores: ['eslint.config.js'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    settings: {
      react: {
        version: '19',
      },
    },
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],
    },
  },
]
