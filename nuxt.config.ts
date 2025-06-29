export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'asboy2035 ∙ Portfolio',
      short_name: 'ash ∙ Port',
      description: 'My personal portfolio.',
      theme_color: '#9f75e8',
      start_url: '/toolbox',
      icons: [
        {
          src: '/images/avatar.png',
          sizes: '1820x1820',
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
