<script setup lang="ts">
  import '&/randomElement'

  import type { Ref } from 'vue'
  import { onMounted, ref } from 'vue'
  import type { LocationQuery } from 'vue-router'

  import { getFlag, setFlag } from '&/setUserFlag'
  import { useRouter } from '#app'
  import LangPickerCard from '+/langs/LangPickerCard.vue'
  import TransitionElement from '+/premade/TransitionElement.vue'
  import Modal from '+/utils/Modal.vue'

  const i18nHead = useLocaleHead()
  // @ts-ignore
  useHead(() => ({ ...i18nHead.value }))

  const showLangPicker: Ref<boolean> = ref(false)
  const cover: Ref = ref(null)
  const router = useRouter()
  const params: LocationQuery = router.currentRoute.value.query
  const backgrounds = [
    'Purple-Close',
    'Blue-Close',
    'Moon-Close',
    'Green-Close',
    'All-Planets',
    'Moon-Purple',
    'Moon-Purple-Green',
    'Blue-Purple',
  ]
  const currentBackground = ref(backgrounds[0]!)
  const fadingOut = ref(false)
  const fadingIn = ref(false)
  const animationTime = 500
  const waitTime = 10000

  function hideLangPicker(): void {
    setFlag('showLangPicker', false)
    showLangPicker.value = false
  }

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

  function getNextBackground(): string {
    const next = backgrounds.randomElement()!
    return next === currentBackground.value ? getNextBackground() : next
  }

  async function cycleBackgrounds(): Promise<void> {
    if (window.location.href.includes('uwu')) {
      currentBackground.value = 'catgirl'
      return
    }

    while (true) {
      fadingIn.value = true
      fadingOut.value = false
      await sleep(animationTime)
      fadingIn.value = false
      await sleep(waitTime)
      fadingOut.value = true
      await sleep(animationTime)
      currentBackground.value = getNextBackground()
      fadingOut.value = false
    }
  }

  onMounted(() => {
    if (params.noLangPicker === 'true') {
      setFlag('showLangPicker', false)
    } else if (params.noLangPicker === 'false') {
      showLangPicker.value = true
      setFlag('showLangPicker', true)
    } else {
      showLangPicker.value = getFlag('showLangPicker', true)
    }

    router.beforeEach((_to, _from, next) => {
      cover.value?.show()
      next()
    })
    router.afterEach(() => setTimeout(() => cover.value?.hide(), 300))
    cycleBackgrounds()
  })
</script>

<template>
  <h1 class="hidden">Your CSS is disabled!</h1>
  <noscript><h1>Your JS is disabled!</h1></noscript>

  <NuxtRouteAnnouncer />
  <NuxtLayout><NuxtPage /></NuxtLayout>

  <svg width="0" height="0">
    <filter id="liquidGlass">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.002"
        numOctaves="2"
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="100"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>

  <img
    class="siteBackground"
    :src="`/backgrounds/${currentBackground}.svg`"
    alt=""
    aria-hidden="true"
    loading="lazy"
    :class="{ fadeInBackground: fadingIn, fadeOutBackground: fadingOut }"
  />

  <TransitionElement ref="cover" />

  <Modal v-if="showLangPicker" plain>
    <LangPickerCard class="modalLangPicker" @set="hideLangPicker" />
  </Modal>
</template>

<style scoped lang="sass">
  .siteBackground
    position: fixed
    top: 50%
    left: 50%
    min-width: 100%
    min-height: 100%
    z-index: -1
    pointer-events: none
    transform: translate(-50%, -50%)
    opacity: var(--backgroundOpacity, 1)
    filter: var(--backgroundFilter, none)
    transition: opacity 0.2s ease

  .fadeOutBackground
    animation: fadeOutBackground 0.5s forwards ease

  .fadeInBackground
    animation: fadeInBackground 0.5s forwards ease

  @keyframes fadeOutBackground
    to
      opacity: 0

  @keyframes fadeInBackground
    from
      opacity: 0

  .modalLangPicker
    width: 100%
    max-width: 30rem
</style>
