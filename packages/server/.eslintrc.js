module.exports = {
  env: {
    es2021: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
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
    '@typescript-eslint/no-this-alias': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-shadow': 'off',
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
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
};
