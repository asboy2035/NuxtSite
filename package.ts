import { BunPm, definePackage } from '@opk/ts-pkg'

function fixPathScript(search: string, replace: string): string {
  return `replace-in-files --string='${search}' --replacement='${replace}' './**/*.{js,ts,vue}' '!./package.*'`
}

export default definePackage({
  pm: BunPm,
  name: '@a35hie/nuxt-site',
  description: 'My personal website.',
  author: {
    name: 'ash',
    email: 'ash@a35.dev',
    url: 'https://a35.dev/',
  },
  version: '7.0.0-beta16',
  license: 'Apache-2.0',
  private: false,
  type: 'module',

  repository: {
    type: 'git',
    url: 'https://github.com/main35/NuxtSite',
  },

  scripts: {
    // code runs
    dev: 'nuxt dev --host 0.0.0.0 --port 5173',
    preview: 'bun run build && nuxt preview --port 4173',
    build: 'bun run fonts && nuxt build',
    ci: 'bun install && bun run build',

    // code style
    prettier: 'oxfmt --write .',
    fixPaths: [
      fixPathScript('@/data/', '$/'),
      fixPathScript('@/types/', ':/'),
      fixPathScript('@/components/', '+/'),
      fixPathScript('@/utils/', '&/'),
    ].join(' && '),
    lint: 'eslint . --fix',
    format: 'bun run prettier && bun run fixPaths && bun run lint',
    fastFormat: 'bun run prettier && bun run lint',

    // code prep
    verifyTranslations: 'bun run utils/verifyTranslations.ts',
    generate: 'nuxt generate',
    postinstall: 'nuxt prepare',
    fonts: 'bun scripts/subsetFonts.ts',
  },

  dependencies: {
    '@iconify/vue': '^5.0.1',
    '@nuxtjs/i18n': '^10.6.0',
    '@opk/ts-pkg': '^0.7.1',
    '@takumi-rs/core': '^2.5.9',
    '@takumi-rs/wasm': '^2.5.9',
    cobe: '^0.6.5',
    'floating-vue': '^5.2.2',
    html2canvas: '^1.4.1',
    marked: '^17.0.3',
    'motion-v': '^2.3.0',
    'postcss-load-config': '^6.0.1',
    'posthog-js': '^1.358.0',
    vue: '^3.5.41',
    'vue-progressive-blur': '^1.0.2',
    'vue-router': '^5.2.0',
  },

  devDependencies: {
    '@nuxt/fonts': '^0.14.0',
    '@types/node': '^26.1.1',
    '@types/subset-font': '^2.3.0',
    '@typescript-eslint/parser': '^8.56.1',
    eslint: '^10.0.2',
    'eslint-plugin-import': '^2.32.0',
    'eslint-plugin-simple-import-sort': '^12.1.1',
    'fast-glob': '^3.3.3',
    nuxt: '^4.5.2',
    'nuxt-og-image': '^6.7.8',
    oxfmt: '^0.62.0',
    'postcss-import': '^16.1.1',
    'replace-in-files-cli': '^4.0.0',
    sass: '^1.102.0',
    'subset-font': '^2.5.0',
    vite: '^8.2.0',
    'vue-eslint-parser': '^10.4.1',
  },
})
