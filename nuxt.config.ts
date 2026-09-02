import { fileURLToPath } from 'node:url'

import { defineNuxtConfig } from 'nuxt/config'

import meta from './package'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        style: '--backgroundOpacity: 0.25; --backgroundFilter: blur(0.5rem)',
      },
      link: [
        {
          rel: 'preconnect',
          href: 'https://api.iconify.design',
          crossorigin: '',
        },
        { rel: 'dns-prefetch', href: 'https://api.iconify.design' },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      ],
    },
  },

  compatibilityDate: '2026-04-17',
  runtimeConfig: {
    public: {
      siteVersion: meta.version,
      siteRelease: 'Style Tweaks',
      posthogPublicKey: 'phc_M5dK6A49VD1zj7L5iamsBbIO4RhikB8FbxUyVfTlEZy',
      posthogHost: 'https://s.a35.dev',
      posthogDefaults: '2025-05-24',
    },
  },

  modules: [
    'floating-vue/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    'motion-v/nuxt',
    'nuxt-og-image',
    'nuxt-shiki',
  ],

  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    $: fileURLToPath(new URL('./data', import.meta.url)),
    ':': fileURLToPath(new URL('./types', import.meta.url)),
    '+': fileURLToPath(new URL('./components', import.meta.url)),
    '&': fileURLToPath(new URL('./utils', import.meta.url)),
  },

  shiki: {
    bundledLangs: [ 'javascript', 'typescript', 'css', 'html', 'json', 'vue' ],
    bundledThemes: [ 'houston' ],
  },

  fonts: {
    families: [
      {
        name: 'JetBrains Mono',
        global: true,
      },
      {
        name: 'Nata Sans',
        weights: [ 400, 600, 700 ],
        global: true,
      },
      {
        name: 'Noto Sans JP',
        src: '/fonts/NotoSansJP.woff2',
        global: true,
      },
      {
        name: 'Noto Sans SC',
        src: '/fonts/NotoSansSC.woff2',
        global: true,
      },
    ],
  },

  i18n: {
    vueI18n: 'i18n.config.ts',
    strategy: 'prefix_except_default',
    baseUrl: import.meta.env.BASE_URL,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-CA',
        files: [
          'global/global-en.json',
          'meta/meta-en.json',
          'pages/pages-en.json',
          'projects/projects-en.json',
        ],
      },
      {
        code: 'fr',
        name: 'Français',
        language: 'fr-FR',
        files: [
          'global/global-fr.json',
          'meta/meta-fr.json',
          'pages/pages-fr.json',
        ],
      },
      {
        code: 'es',
        name: 'Español',
        language: 'es-ES',
        files: [
          'global/global-es.json',
          'meta/meta-es.json',
          'pages/pages-es.json',
        ],
      },
      {
        code: 'ja',
        name: '日本語',
        language: 'ja-JP',
        files: [
          'global/global-ja.json',
          'meta/meta-ja.json',
          'pages/pages-ja.json',
        ],
      },
      {
        code: 'zh',
        name: '简体中文',
        language: 'zh-CN',
        files: [
          'global/global-zh.json',
          'meta/meta-zh.json',
          'pages/pages-zh.json',
        ],
      },
      {
        code: 'de',
        name: 'Deutsch',
        language: 'de-DE',
        files: [
          'global/global-de.json',
          'meta/meta-de.json',
          'pages/pages-de.json',
        ],
      },
      {
        code: 'ru',
        name: 'Русский',
        language: 'ru-RU',
        files: [
          'global/global-ru.json',
          'meta/meta-ru.json',
          'pages/pages-ru.json',
          'projects/projects-ru.json',
        ],
      },
      {
        code: 'uk',
        name: 'Українська',
        language: 'uk-UA',
        files: [
          'global/global-uk.json',
          'meta/meta-uk.json',
          'pages/pages-uk.json',
        ],
      },
      {
        code: 'pt',
        name: 'Português',
        language: 'pt-BR',
        files: [
          'global/global-pt.json',
          'meta/meta-pt.json',
          'pages/pages-pt.json',
        ],
      },
      {
        code: 'kk',
        name: 'Қазақша',
        language: 'kk-KZ',
        files: [
          'global/global-kk.json',
          'meta/meta-kk.json',
          'pages/pages-kk.json',
        ],
      },
      {
        code: 'fi',
        name: 'Suomi',
        language: 'fi-FI',
        files: [
          'global/global-fi.json',
          'meta/meta-fi.json',
          'pages/pages-fi.json',
        ],
      },
      {
        code: 'pl',
        name: 'Polski',
        language: 'pl-PL',
        files: [
          'global/global-pl.json',
          'meta/meta-pl.json',
          'pages/pages-pl.json',
        ],
      },
    ],
    langDir: 'locales/',
  },

  devtools: { enabled: true },
  css: [ '@/styles/global.sass' ],

  vite: {
    build: {
      sourcemap: 'inline',
    },
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },
})
