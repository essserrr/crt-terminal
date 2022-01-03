module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './'],
      },
    },
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/jsx-props-no-spreading': [
      'error',
      {
        custom: 'enforce',
        exceptions: ['App', 'AppChildComponent'],
      },
    ],
    'react/require-default-props': ['off'],
    'import/prefer-default-export': ['off'],
    'react/no-array-index-key': ['off'],
    'react/jsx-no-useless-fragment': [
      2,
      {
        allowExpressions: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        controlComponents: ['CommandLine'],
        depth: 2,
      },
    ],
  },
};
