module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'no-extra-semi': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
  },
};
