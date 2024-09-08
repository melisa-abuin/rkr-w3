module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feature', 'fix', 'refactor', 'deps', 'docs', 'test'],
    ],
    'subject-case': [0],
    'subject-empty': [0],
    'type-empty': [0],
    'header-pattern': [
      2,
      'always',
      /^(feature|fix|refactor|deps|docs|test)[\s]+#[0-9]+:[\s]+.+$/,
    ], // Remove this in case we want to use the standard commit structure <type>(<optional scope>): <subject>
    'header-max-length': [0],
  },
}
