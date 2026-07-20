import { fileURLToPath } from 'node:url'

import { defineNuxtConfig } from 'nuxt/config'

import meta from './package'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {},
      link: [
        {
          rel: 'preconnect',
          href: 'https://api.iconify.design',
          crossorigin: '',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.a35hie.me',
          crossorigin: '',
        },
        { rel: 'dns-prefetch', href: 'https://api.iconify.design' },
        { rel: 'dns-prefetch', href: 'https://fonts.a35hie.me' },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      ],
      script: [ { src: 'https://cdn.ko-fi.tools/v2/js/shop.js', defer: true } ],
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
    '@vite-pwa/nuxt',
    'floating-vue/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    'motion-v/nuxt',
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
    baseUrl: 'https://a35hie.me',
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
        language: 'en-US',
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
        code: 'jp',
        name: '日本語',
        language: 'jp-JP',
        files: [
          'global/global-jp.json',
          'meta/meta-jp.json',
          'pages/pages-jp.json',
        ],
      },
      {
        code: 'cn',
        name: '中文',
        language: 'zh-CN',
        files: [
          'global/global-cn.json',
          'meta/meta-cn.json',
          'pages/pages-cn.json',
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
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Toolbox - Ash',
      short_name: 'Toolbox',
      description: "a35hie's Toolbox app.",
      theme_color: '#9f75e8',
      start_url: '/toolbox',
      icons: [
        {
          src: '/images/icons/Toolbox.png',
          sizes: '1024x1024',
          type: 'image/png',
        },
      ],
    },
  },
  devtools: { enabled: true },
  css: [ '@/styles/global.sass' ],
  vite: {
    build: {
      sourcemap: 'inline',
    },
  },
  nitro: {
    compressPublicAssets: true,
    publicAssets: [
      {
        dir: 'public',
        baseURL: '/',
      },
    ],
    externals: {
      inline: [ 'vue' ],
    },
  },
})
