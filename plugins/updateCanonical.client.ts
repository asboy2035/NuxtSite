import { defineNuxtPlugin, useRouter } from '#app'

export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach((to) => {
    const baseUrl = 'https://asboy2035.com'
    const canonicalLink = document.querySelector("link[rel='canonical']")

    const fullUrl = baseUrl + to.fullPath

    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullUrl)
    } else {
      const link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', fullUrl)
      document.head.appendChild(link)
    }
  })
})
