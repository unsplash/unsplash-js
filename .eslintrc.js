module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  rules: {
    'object-shorthand': 2,
    'arrow-body-style': [2, 'as-needed'],
  },
};
