module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    es6: true,
    node: true
  },
  rules: {
    'no-console': 0,
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {functions: false}]
  }
}
