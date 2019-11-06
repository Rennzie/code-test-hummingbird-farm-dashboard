module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    },
    project: './tsconfig.json',
    tsconfigRootDir: './'
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'jsx-a11y',
    'import',
    'material-ui'
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
    serviceworker: true
  },
  globals: {
    google: true
  },
  settings: {
    'import/extensions': ['.js', '.tsx', '.ts'],
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  rules: {
    //===== ESLINT ==========//
    '@typescript-eslint/object-curly-newline': 'off',
    '@typescript-eslint/arrow-parens': 'off',
    '@typescript-eslint/no-underscore-dangle': 'off',
    '@typescript-eslint/eslint(camelcase)': 'off',
    'import/no-cycle': 'off',

    //===== PLUGINS ==========//
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/jsx-filename-extension': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/forbid-prop-types': 'warn',
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-interface': 'off'
  }
};
