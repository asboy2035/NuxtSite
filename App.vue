<script setup lang="ts">
  import '&/randomElement'

  import { Icon } from '@iconify/vue'
  import type { Ref } from 'vue'
  import { onMounted, ref } from 'vue'
  import { ProgressiveBlur } from 'vue-progressive-blur'
  import type { LocationQuery } from 'vue-router'

  import { getFlag, setFlag } from '&/setUserFlag'
  import { useRouter } from '#app'
  import LangPickerCard from '+/langs/LangPickerCard.vue'
  import HStack from '+/layout/HStack.vue'
  import Navbar from '+/premade/navbar/Navbar.vue'
  import Navbar2 from "+/premade/navbar/Navbar2.vue";
  import TransitionElement from '+/premade/TransitionElement.vue'
  import Modal from '+/utils/Modal.vue'

  const { t } = useI18n()
  const i18nHead = useLocaleHead()

  // Set head lang metadata.
  // @ts-ignore
  useHead(() => ({
    ...i18nHead.value,
  }))

  const showingUi: Ref<boolean> = ref(true)
  const showLangPicker: Ref<boolean> = ref(false)
  const cover: Ref = ref(null)
  const router = useRouter()
  const params: LocationQuery = router.currentRoute.value.query
  const backgrounds: string[] = [
    // Closeups
    'Purple-Close',
    'Blue-Close',
    'Moon-Close',
    'Green-Close',

    // Scenes
    'All-Planets',

    // Collections
    'Moon-Purple',
    'Moon-Purple-Green',
    'Blue-Purple',
  ]
  const currentBackground: Ref<string> = ref(backgrounds[0] as string)

  function hideLangPicker(): void {
    setFlag('showLangPicker', false)
    showLangPicker.value = false
  }

  onMounted(() => {
    if (params.noLangPicker == 'true') {
      showLangPicker.value = false
      setFlag('showLangPicker', false)
    } else if (params.noLangPicker == 'false') {
      showLangPicker.value = true
      setFlag('showLangPicker', true)
    } else {
      showLangPicker.value = getFlag('showLangPicker', true)
    }

    router.beforeEach((_to, _from, next) => {
      cover.value?.show()
      setTimeout(() => {
        next()
      }, 400)
    })

    router.afterEach(() => {
      setTimeout(() => {
        cover.value?.hide()
      }, 200)
    })

    cycleBackgrounds()
  })

  // Background Cycling
  const fadingOut: Ref<boolean> = ref(false)
  const fadingIn: Ref<boolean> = ref(false)
  const animationTime: number = 500
  const waitTime: number = 10000
  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

  async function cycleBackgrounds(): Promise<never | void> {
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

  function getNextBackground(): string {
    const nextBackground: string = backgrounds.randomElement()!

    if (nextBackground == currentBackground.value) {
      return getNextBackground()
    }

    return nextBackground
  }
</script>

<template>
  <VitePwaManifest />

  <h1 class="hidden">Your CSS is disabled!</h1>
  <noscript><h1>Your JS is disabled!</h1></noscript>

  <HStack
    class="interfaceOptions"
    v-if="$route.meta.showingInterfaceOptions !== false"
  >
    <button @click="showingUi = !showingUi">
      <Icon
        :icon="
          showingUi
            ? 'solar:window-frame-line-duotone'
            : 'solar:window-frame-bold-duotone'
        "
      />
      {{ t(showingUi ? 'app.hideInterface' : 'app.showInterface') }}
    </button>

    <a href="https://ko-fi.com/s/b635cf0ef1" target="_blank">
      <button>
        <Icon icon="solar:bag-heart-line-duotone" />
        {{ t('app.getWalls') }}
      </button>
    </a>
  </HStack>

  <NuxtPage v-if="showingUi" />

  <div class="progBlurContainer">
    <ProgressiveBlur class="progBlur" :blur="18" :border-radius="0" />
    <div class="progMask" />
  </div>

  <img
    class="siteBackground"
    :src="`/backgrounds/${currentBackground}.svg`"
    alt="Background"
    aria-hidden="true"
    loading="lazy"
    :class="{
      fadeInBackground: fadingIn,
      fadeOutBackground: fadingOut,
      dimmed: showingUi,
    }"
  />

<!--  <Navbar v-if="showingUi" />-->
  
  <Navbar2 v-if="showingUi" />

  <TransitionElement ref="cover" />

  <Modal plain v-if="showLangPicker">
    <LangPickerCard @set="hideLangPicker" />
  </Modal>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  $blurHeight: 9rem
  $blurTop: calc(100vh - $blurHeight)
  $blurTop: calc(100dvh - $blurHeight)

  html
    --backgroundOpacity: 1

    .dimmed
      --backgroundOpacity: 0.25

    html[lang="ca-ES"]
      --backgroundOpacity: 0.5

  $backgroundOpacity: var(--backgroundOpacity)

  .progBlurContainer
    position: fixed
    height: $blurHeight
    bottom: 0 !important
    left: 0
    right: 0
    z-index: 9
    pointer-events: none
    border-radius: 0

    .progBlur, .progMask
      top: 0
      bottom: 0
      left: 0
      right: 0
      width: 100%
      height: 100%

    .progBlur
      z-index: 10

    .progMask
      background: linear-gradient(to top, colors.$backgroundColor, transparent)
      opacity: 0.6

  .interfaceOptions
    margin-top: 1rem
    width: calc(100vw - 2rem)
    max-width: 30rem
    z-index: 11

    button
      backdrop-filter: blur(0.5rem)

    button, a
      flex-grow: 1

  .siteBackground
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

    min-width: 100%
    min-height: 100%
    z-index: 0
    pointer-events: none
    opacity: $backgroundOpacity
    transition: opacity 0.2s ease

  // Background animations
  .fadeOutBackground
    animation: fadeOutBackground 0.5s forwards ease

  @keyframes fadeOutBackground
    0%
      opacity: $backgroundOpacity
    100%
      opacity: 0

  .fadeInBackground
    animation: fadeInBackground 0.5s forwards ease

  @keyframes fadeInBackground
    0%
      opacity: 0
    100%
      opacity: $backgroundOpacity
</style>
