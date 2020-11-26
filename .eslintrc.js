/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'object-shorthand': 2,
    'arrow-body-style': [2, 'as-needed'],
    '@typescript-eslint/strict-boolean-expressions': [2],
  },
};
