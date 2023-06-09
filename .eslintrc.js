module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  plugins: [
    '@typescript-eslint',
    '@angular-eslint',
    'import',
    'prettier',
    '@nrwl/nx',
    'unicorn',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@nrwl/nx/typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        'plugin:unicorn/recommended',
      ],
      rules: {
        'import/no-unresolved': 'error',
        'unicorn/filename-case': [
          'warn',
          {
            cases: {
              camelCase: true,
              pascalCase: true,
              snakeCase: true,
              kebabCase: true,
            },
          },
        ],
        'unicorn/consistent-function-scoping': [
          'off',
          {
            checkArrowFunctions: false,
          },
        ],
        curly: 2,
        radix: 2,
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        '@angular-eslint/relative-url-prefix': ['error'],
        '@angular-eslint/no-output-rename': ['error'],
        '@angular-eslint/no-output-on-prefix': ['error'],
        '@angular-eslint/no-input-rename': ['error'],
        '@angular-eslint/no-input-prefix': ['error'],
        '@angular-eslint/no-forward-ref': ['error'],
        '@angular-eslint/no-conflicting-lifecycle': ['error'],
        '@angular-eslint/prefer-output-readonly': ['error'],
        '@angular-eslint/component-class-suffix': ['error'],
        '@angular-eslint/directive-class-suffix': ['error'],
        '@angular-eslint/directive-selector': ['error'],
        '@angular-eslint/no-host-metadata-property': ['error'],
        '@angular-eslint/no-inputs-metadata-property': ['error'],
        '@angular-eslint/component-selector': ['error'],
        '@angular-eslint/no-outputs-metadata-property': ['error'],
        '@angular-eslint/no-queries-metadata-property': ['error'],
        '@angular-eslint/pipe-prefix': ['error'],
        '@angular-eslint/use-lifecycle-interface': ['error'],
        '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
        '@angular-eslint/no-pipe-impure': ['error'],
        '@angular-eslint/no-output-native': ['error'],
        '@angular-eslint/no-lifecycle-call': ['error'],
        '@angular-eslint/no-attribute-decorator': ['error'],
        '@angular-eslint/use-injectable-provided-in': ['error'],
        '@angular-eslint/contextual-lifecycle': ['error'],
        '@angular-eslint/contextual-decorator': ['error'],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      parserOptions: {
        project: ['./tsconfig.base.json'],
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nrwl/nx/javascript'],
      rules: {},
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true,
      },
      rules: {},
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        '@angular-eslint/template/no-call-expression': ['error'],
        '@angular-eslint/template/use-track-by-function': ['error'],
        '@angular-eslint/use-component-selector': ['error'],
        '@angular-eslint/template/cyclomatic-complexity': ['error'],
        '@angular-eslint/template/conditional-complexity': ['error'],
        '@angular-eslint/template/no-negated-async': ['error'],
        '@angular-eslint/template/no-distracting-elements': ['error'],
        '@angular-eslint/template/no-autofocus': ['error'],
        '@angular-eslint/template/no-any': ['error'],
        '@angular-eslint/template/mouse-events-have-key-events': ['error'],
        '@angular-eslint/template/click-events-have-key-events': ['error'],
        '@angular-eslint/template/banana-in-box': ['error'],
        '@angular-eslint/template/accessibility-valid-aria': ['error'],
        '@angular-eslint/template/accessibility-table-scope': ['error'],
        '@angular-eslint/template/accessibility-label-for': ['error'],
        '@angular-eslint/template/accessibility-elements-content': ['error'],
        '@angular-eslint/template/accessibility-alt-text': ['error'],
      },
    },
  ],
};
