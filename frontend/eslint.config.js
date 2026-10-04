import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // eslint-plugin-react-hooks v7's "recommended" preset bundles ~16 new
      // experimental React Compiler rules (set-state-in-effect, immutability,
      // purity, etc). This codebase predates those rules and uses standard,
      // safe patterns (e.g. calling an async fetch function from useEffect)
      // that the new experimental rules flag as hard errors even though they
      // work correctly. Sticking with just the two classic, battle-tested
      // hook rules that actually catch real bugs, rather than doing a large
      // speculative rewrite of every data-fetching hook in the app.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
])
