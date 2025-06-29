// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'robots.txt',
      'apple-touch-icon.png',
      'images/avatar.png',
    ],
    manifest: {
      name: 'asboy2035 ∙ Portfolio',
      short_name: 'ash ∙ Port',
      description: 'My personal portfolio.',
      theme_color: '#9f75e8',
      icons: [
        {
          src: '/images/avatar.png',
          sizes: '1820x1820',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 200000000,
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
      globIgnores: ['**/sw.js'],
      runtimeCaching: [
        {
          urlPattern: /^https?.*/, // catch all HTTP(S) requests
          handler: 'CacheFirst',
          options: {
            cacheName: 'ash-pwa-cache',
            expiration: {
              maxEntries: 300,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: 'module',
    },
  },
  devtools: { enabled: true },
  css: [
    "@/styles/global.sass"
  ],
  nitro: {
    publicAssets: [
      {
        dir: 'public',
        baseURL: '/',
      },
    ],
  },
})
