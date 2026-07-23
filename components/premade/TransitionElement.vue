<script setup lang="ts">
  import { ref } from 'vue'

  import Loader from '+/premade/Loader.vue'

  const { t } = useI18n()

  const isActive = ref(false) // Progress bar
  const showOverlay = ref(false) // Fullscreen overlay
  const showingConnecting = ref(false)

  let overlayTimeout: ReturnType<typeof setTimeout> | undefined
  let connectingTimeout: ReturnType<typeof setTimeout> | undefined

  function show() {
    isActive.value = true
    showOverlay.value = false
    showingConnecting.value = false

    overlayTimeout = setTimeout(() => {
      showOverlay.value = true
    }, 500)

    connectingTimeout = setTimeout(() => {
      showingConnecting.value = true
    }, 4000)
  }

  function hide() {
    isActive.value = false
    showOverlay.value = false
    showingConnecting.value = false

    clearTimeout(overlayTimeout)
    clearTimeout(connectingTimeout)
  }

  defineExpose({ show, hide })
</script>

<template>
  <Transition name="loader">
    <div v-if="isActive" class="progressBar" />
  </Transition>

  <div class="transitionElement" :class="{ active: showOverlay }">
    <Loader class="loadingIcon" />
    <p :class="{ hidden: !showingConnecting }">
      {{ t('app.connecting') }}
    </p>
  </div>
</template>

<style scoped lang="sass">
  .transitionElement
    position: fixed
    display: flex
    align-items: center
    justify-content: center
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 21
    pointer-events: none
    background: var(--backgroundColor)
    border-radius: 0

    // Animation
    filter: blur(1rem)
    opacity: 0
    transition: 0.3s ease

    &.active
      opacity: 0.8
      filter: none

  .progressBar
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 0.1rem
    z-index: 7

    background: linear-gradient(to right, var(--accentColor), var(--swirly02))

  .loader-enter-from
    transform: translateX(-100%)

  .loader-enter-to
    transform: translateX(0)

  .loader-enter-active
    transition: transform 2s ease

  .loader-leave-active
    transition: none

  .loader-leave-to
    transform: translateX(-100%)

  .loadingIcon
    width: 5rem
    height: 5rem
</style>
