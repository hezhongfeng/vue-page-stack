module.exports = {
  types: [
    {
      value: ':sparkles: feat',
      name: '✨ feat:     新功能'
    },
    {
      value: ':bug: fix',
      name: '🐛 fix:      修复bug'
    },
    {
      value: ':lipstick: style',
      name: '💄 style:    代码的样式美化'
    },
    {
      value: ':pencil2: docs',
      name: '✏️  docs:     文档变更'
    },
    {
      value: ':rocket: chore',
      name: '🚀 chore:    构建/工程依赖/工具'
    },
    {
      value: ':recycle: refactor',
      name: '♻️  refactor: 重构'
    },
    {
      value: ':zap: perf',
      name: '⚡️ perf:     性能优化'
    },
    {
      value: ':package: build',
      name: '📦️ build:    打包'
    },
    {
      value: ':white_check_mark: test',
      name: '✅ test:     测试'
    },
    {
      value: ':rewind: revert',
      name: '⏪️ revert:   回退'
    }
  ],
  scopes: [{ name: '文档' }, { name: '资源' }, { name: '表现' }],
  // 交互提示信息
  messages: {
    scope: '修改范围',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    breaking: '列出任何BREAKING CHANGES(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认提交？'
  },
  allowCustomScopes: true,
  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100, // subject 限制长度
  breaklineChar: '|' // 换行符，支持 body 和 footer
};
