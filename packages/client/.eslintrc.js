module.exports = {
  env: {
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-debugger': 2,
    'import/extensions': 0,
    'no-unused-expressions': 'error',
    'no-useless-return': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
