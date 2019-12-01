module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'wip'],
    ],
    'scope-case': [1, 'always', 'pascal-case'],
    'subject-case': [0],
    'subject-full-stop': [0],
  },
};
