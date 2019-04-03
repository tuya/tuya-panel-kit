'use strict';

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复Bug' },
    { value: 'docs', name: 'docs:     文档变动' },
    {
      value: 'style',
      name: 'style:    不会影响到代码功能的变动(white-space, formatting, missing semi-colons, etc)',
    },
    { value: 'refactor', name: 'refactor: 重构代码' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     测试相关' },
    { value: 'chore', name: 'chore:    重新打包或更新依赖工具等杂活' },
    { value: 'revert', name: 'revert:   Revert to a commit' },
    { value: 'wip', name: 'wip:      Work in progress' },
  ],

  // override the messages, defaults are as follows
  messages: {
    type: '请选择 Commit 类型:',
    customScope: '请选择影响范围 (Scope) (可选):',
    subject: '请提供一段简要的 Commit 信息:\n',
    body: '请提供一段详细的信息来描述此次更改 (可选). 使用 "|" 来另起一行:\n',
    breaking: '是否有任何 BREAKING CHANGES (可选):\n',
    footer: '是否有任何 ISSUE 可以被此次 Commit 关闭 (可选). E.g.: #31, #34:\n',
    confirmCommit: '是否确认提交上述 Commit 信息?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor'],

  // limit subject length
  subjectLimit: 100,
};
