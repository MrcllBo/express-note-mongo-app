module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:jest/recommended', 'google'],
  plugins: ['prettier', 'unused-imports', 'jest'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'require-jsdoc': 0,
    'max-len': ['error', { code: 100 }],
    'new-cap': [
      'error',
      {
        newIsCap: false,
        capIsNew: false,
        properties: true,
        newIsCapExceptions: ['default'],
      },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
