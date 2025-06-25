<template>
  <transitionable ref="transitionable">
    <h1 class="hidden">Your CSS is disabled!</h1>
    <NuxtPage />
    <div class="progBlurContainer">
      <progressive-blur class="progBlur" blur="48" border-radius="0" />
    </div>
  </transitionable>

  <img
    class="siteBackground"
    src="@/visuals/PageBackground.svg"
    alt="Background" aria-hidden="true"
  >

  <transition-element ref="cover" />

  <banner-notification>
    <h-stack>
      <v-stack>
        <h3 class="noMargins">Consider Supporting!</h3>
        <p class="noMargins">Support me on Ko-fi to help development :)</p>
      </v-stack>

      <a href="https://ko-fi.com/asboy2035">
        <button>
          <Icon icon="cib:ko-fi" width="32" height="32" />
          Ko-fi
        </button>
      </a>
    </h-stack>
  </banner-notification>

  <modal v-if="showDomainTip">
    <h1>You're on the old domain!</h1>
    <p>Access this site at asboy2035.com for a cleaner link!</p>
    <spacer />

    <h-stack class="autoSpace fullWidth">
      <button @click="showDomainTip = false">Later</button>

      <a :href="redirectLink">
        <button>Take me there!</button>
      </a>
    </h-stack>
  </modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from '#app' // Nuxt's router import
import TransitionElement from '@/components/premade/TransitionElement.vue'
import Transitionable from '@/components/premade/Transitionable.vue'
import Modal from '@/components/utils/Modal.vue'
import Spacer from '@/components/utils/Spacer.vue'
import HStack from '@/components/layout/HStack.vue'
import BannerNotification from '@/components/utils/BannerNotification.vue'
import VStack from '@/components/layout/VStack.vue'
import { Icon } from '@iconify/vue'
import { ProgressiveBlur } from 'vue-progressive-blur'

const showDomainTip = ref(false)
const redirectLink = ref('') // make it reactive

onMounted(() => {
  // Now it's safe to access location
  if (location.hostname.includes('pages.dev')) {
    showDomainTip.value = true
  }

  redirectLink.value = `https://asboy2035.com${location.pathname}${location.search}${location.hash}`

  router.beforeEach((to, from, next) => {
    transitionable.value?.show()
    cover.value?.show()
    setTimeout(() => {
      next()
    }, 400)
  })

  router.afterEach(() => {
    setTimeout(() => {
      transitionable.value?.hide()
      cover.value?.hide()
    }, 200)
  })

  // Hide the loading screen when mounted
  const loader = document.getElementById('loading-screen')
  loader?.classList.add('hidden')
})

const cover = ref(null)
const transitionable = ref(null)
const router = useRouter()
</script>

<style scoped lang="sass">
$blurHeight: 7rem
$blurTop: calc(100vh - $blurHeight)
$blurTop: calc(100dvh - $blurHeight)

.progBlurContainer
  position: fixed
  top: 0
  bottom: 0 !important
  left: 0
  right: 0
  z-index: 9
  pointer-events: none

.progBlur
  left: 0
  right: 0
  bottom: 0
  height: $blurHeight
  z-index: 10
  margin-top: $blurTop

.siteBackground
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  min-width: 100%
  min-height: 100%
  z-index: 0
  pointer-events: none
  opacity: 0.2
</style>