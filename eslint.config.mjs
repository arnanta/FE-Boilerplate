import antfu from '@antfu/eslint-config';
import globals from 'globals';

export default antfu(
  {
    type: 'app',
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'double',
    },
  },
  {
    ignores: ['dist', 'node_modules', '.turbo', '.next', 'coverage', '*.min.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript rules
      'ts/no-redeclare': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],

      // Console & process
      'no-console': ['warn'],
      'node/prefer-global/process': 'off',
      'node/no-process-env': 'error',

      // Antfu / Unicorn / Perfectionist
      'antfu/no-top-level-await': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          tsconfigRootDir: '.',
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['README.md'],
        },
      ],
    },
  },
);
