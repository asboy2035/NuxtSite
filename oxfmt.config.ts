import { defineConfig } from 'oxfmt'

export default defineConfig({
  ignorePatterns: [
    '.gitignore',
    'LICENSE',
    'README.md',
    'bun.lock',
    'dist',
    '.output',
    '.nuxt',
    'node_modules',
    'NuxtSite.iml',
    '.vscode',
    '.idea',
  ],

  trailingComma: 'es5',
  vueIndentScriptAndStyle: true,
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
})
