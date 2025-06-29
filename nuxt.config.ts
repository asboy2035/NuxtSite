export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Toolbox ∙ asboy2035',
      short_name: 'Toolbox',
      description: 'asboy2035 Toolbox app.',
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
