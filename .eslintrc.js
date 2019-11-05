module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react-hooks', 'prettier'],
  extends: ['eslint:recommended', 'react-app', 'plugin:prettier/recommended'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'],
    quotes: [2, 'single'],
    semi: 2,
    'max-len': [2, 120],
    'space-infix-ops': 2,
    'prefer-arrow-callback': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-param-reassign': 1,
    'import/prefer-default-export': 1,
    'jsx-a11y/no-static-element-interactions': 1,
    'no-empty-function': 1,
    'react/no-array-index-key': 1,
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/button-has-type': 0,
    'no-trailing-spaces': 0,
    'require-jsdoc': 0,
    'no-invalid-this': 0,
    'global-require': 0,
    'no-underscore-dangle': 0,
    'no-bitwise': 0,
    'import/no-absolute-path': 0,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'react/no-multi-comp': 0,
    'class-methods-use-this': 0,
    'react/prefer-stateless-function': 0,
    'no-template-curly-in-string': 0,
    'no-await-in-loop': 0,
    'no-console': 0,
    'arrow-parens': 0,
    'no-nested-ternary': 0,
    'react/jsx-no-target-blank': 0,
    'no-throw-literal': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-restricted-syntax': 0,
    'jsx-a11y/no-static-element-interactions': 0
  }
};
