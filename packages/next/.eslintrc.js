const path = require('path')
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    node: true
  },
  plugins: ['react', 'flowtype', 'jest', 'prettier', 'import', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier/flowtype',
    'prettier/react'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    radix: 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@components', path.resolve(__dirname, 'components')],
        ['@lib', path.resolve(__dirname, 'lib')],
        ['@store', path.resolve(__dirname, 'store')],
        ['@hooks', path.resolve(__dirname, 'hooks')]
      ]
    }
  }
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: '/packages/next/webpack.config.js'
  //     }
  //   }
  // }
}
