module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'prefer-destructuring': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'warn',
    'no-empty-function': 'warn',
  },
};
