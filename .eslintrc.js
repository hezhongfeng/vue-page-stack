module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['@vue/standard'],
  /**
   *
   * "off" or 0 - 关闭规则
   * "warn" or 1 - 将规则视为一个警告（不会影响退出码）
   * "error" or 2 - 将规则视为一个错误 (退出码为1)
   *
   */
  rules: {
    // always使用分号，增加代码的可读性和歧义
    semi: ['error', 'always'],
    // 使用let或者const代替
    'no-var': 'error',
    // 去除函数括号前的空格缩进
    'space-before-function-paren': 0,
    // 箭头函数只有一个参数的情况下可以省略括号
    'arrow-parens': ['error', 'as-needed'],
    // allow async-await
    'generator-star-spacing': 'off',
    'no-debugger': 'error',
    'vue/no-use-v-if-with-v-for': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
