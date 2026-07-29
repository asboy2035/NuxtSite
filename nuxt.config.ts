import { fileURLToPath } from 'node:url'

import { defineNuxtConfig } from 'nuxt/config'

import meta from './package'

export default defineNuxtConfig({
  app: {
    head: {
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
      siteRelease: 'v7 Beta!',
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
  ],

  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    $: fileURLToPath(new URL('./data', import.meta.url)),
    ':': fileURLToPath(new URL('./types', import.meta.url)),
    '+': fileURLToPath(new URL('./components', import.meta.url)),
    '&': fileURLToPath(new URL('./utils', import.meta.url)),
  },

  fonts: {
    families: [
      {
        name: 'JetBrains Mono',
        global: true,
      },
      {
        name: 'Nata Sans',
        global: true,
      },
    ],
  },

  i18n: {
    strategy: 'prefix_except_default',
    baseUrl: import.meta.env.BASE_URL,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
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
        ],
      },
      {
        code: 'pt',
        name: 'Português',
        language: 'pt-PT',
        files: [
          'global/global-pt.json',
          'meta/meta-pt.json',
          'pages/pages-pt.json',
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
        code: 'nl',
        name: 'Nederlands',
        language: 'nl-NL',
        files: [
          'global/global-nl.json',
          'meta/meta-nl.json',
          'pages/pages-nl.json',
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
