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
  const { uwu } = useUwu()

  // @ts-ignore
  useHead(() => ({ ...i18nHead.value }))

  const showLangPicker: Ref<boolean> = ref(false)
  const cover: Ref = ref(null)
  const router = useRouter()
  const params: LocationQuery = router.currentRoute.value.query
  const backgrounds = [
    'Purple-Close.svg',
    'Blue-Close.svg',
    'Moon-Close.svg',
    'Green-Close.svg',
    'All-Planets.svg',
    'Moon-Purple.svg',
    'Moon-Purple-Green.svg',
    'Blue-Purple.svg',
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
    if (uwu.value) {
      currentBackground.value = 'Uwu.jpeg'
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

  cycleBackgrounds()

  onMounted(() => {
    if (params.noLangPicker === 'true') {
      setFlag('showLangPicker', false)
    } else if (params.noLangPicker === 'false') {
      showLangPicker.value = true
      setFlag('showLangPicker', true)
    } else {
      showLangPicker.value = getFlag('showLangPicker', true)
    }

    router.beforeEach((to, from) => {
      if ('uwu' in from.query && !('uwu' in to.query)) {
        return {
          path: to.path,
          query: {
            ...to.query,
            uwu: from.query.uwu ?? '',
          },
          hash: to.hash,
        }
      }

      cover.value?.show()
    })

    router.afterEach(() => {
      setTimeout(() => cover.value?.hide(), 300)
    })
  })
</script>

<template>
  <h1 class="hidden">Your CSS is disabled!</h1>
  <noscript><h1>Your JS is disabled!</h1></noscript>

  <NuxtRouteAnnouncer />
  <NuxtLayout><NuxtPage /></NuxtLayout>

  <img
    class="siteBackground"
    :src="`/backgrounds/${currentBackground}`"
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
