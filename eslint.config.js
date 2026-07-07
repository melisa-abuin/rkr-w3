const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')
const nextTypescript = require('eslint-config-next/typescript')

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { ignores: ['eslint.config.js', 'jest.config.js'] },
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
  // Atomic design layer import restrictions
  {
    files: ['components/atoms/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/atoms/**',
                '@/components/molecules/**',
                '@/components/organisms/**',
                '@/components/templates/**',
              ],
              message: 'Atoms cannot import from any component layer.',
            },
            {
              group: ['../**'],
              message: 'Atoms must not use relative cross-folder imports.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['components/molecules/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/molecules/**',
                '@/components/organisms/**',
                '@/components/templates/**',
              ],
              message: 'Molecules cannot import from the same or higher layers.',
            },
            {
              group: ['@/components/*/*/components/**'],
              message: 'Molecules cannot import internal subcomponents of other components.',
            },
            {
              group: ['../../atoms/**'],
              message: 'Molecules must use the @/ alias to import atoms.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['components/organisms/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/organisms/**',
                '@/components/templates/**',
              ],
              message: 'Organisms cannot import from the same or higher layers.',
            },
            {
              group: ['@/components/*/*/components/**'],
              message: 'Organisms cannot import internal subcomponents of other components.',
            },
            {
              group: ['../../molecules/**', '../../atoms/**'],
              message: 'Organisms must use the @/ alias to import atoms and molecules.',
            },
          ],
        },
      ],
    },
  },
]
