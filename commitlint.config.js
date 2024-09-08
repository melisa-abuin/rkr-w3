module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feature', 'fix', 'refactor', 'deps', 'docs', 'test'],
    ],
    'subject-case': [0],
    'type-empty': [0],
    'subject-empty': [0],
    'header-max-length': [2, 'always', 72],
    'custom-rule': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'custom-rule': ({ header }) => {
          const issuePattern =
            /^(feature|fix|refactor|deps|docs|test)[\s]+#[0-9]+:[\s]+.+$/
          return [
            issuePattern.test(header),
            'Commit message should match "<type> #<issue-number>: <subject>" format. E.g., "feature #5: add new feature"',
          ]
        },
      },
    },
  ],
}
