<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { onBeforeUnmount, ref, watch } from 'vue'
  import { ProgressiveBlur } from 'vue-progressive-blur'

  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import Navbar2 from '+/premade/navbar/Navbar2.vue'
  import SideNav from '+/premade/navbar/SideNav.vue'

  const { t } = useI18n()
  const showingUi = ref(true)

  watch(
    showingUi,
    (visible) => {
      if (!import.meta.client) return
      document.documentElement.style.setProperty(
        '--backgroundOpacity',
        visible ? '0.25' : '1'
      )
      document.documentElement.style.setProperty(
        '--backgroundFilter',
        visible ? 'blur(0.5rem)' : 'none'
      )
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (!import.meta.client) return
    document.documentElement.style.removeProperty('--backgroundOpacity')
    document.documentElement.style.removeProperty('--backgroundFilter')
  })
</script>

<template>
  <div class="navigationView">
    <SideNav v-if="showingUi" />
    <VStack class="contentStack">
      <HStack
        v-if="$route.meta.showingInterfaceOptions !== false"
        class="interfaceOptions"
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
            <Icon icon="solar:bag-heart-line-duotone" />{{ t('app.getWalls') }}
          </button>
        </a>
      </HStack>
      <slot v-if="showingUi" />
      <div class="progBlurContainer">
        <ProgressiveBlur class="progBlur" :blur="18" :border-radius="0" />
        <div class="progMask" />
      </div>
    </VStack>
  </div>
  <Navbar2 v-if="showingUi" />
</template>

<style scoped lang="sass">
  $blurHeight: 9rem
  .contentStack
    align-items: center !important
    width: 100%
  .progBlurContainer
    position: fixed
    right: 0
    bottom: 0
    left: 0
    z-index: 9
    height: $blurHeight
    pointer-events: none
    .progBlur, .progMask
      position: absolute
      inset: 0
      width: 100%
      height: 100%
    .progBlur
      z-index: 10
    .progMask
      background: linear-gradient(to top, var(--backgroundColor), transparent)
      opacity: 0.6
  .interfaceOptions
    z-index: 11
    width: calc(100vw - 2rem)
    max-width: 30rem
    margin-top: 1rem
    button
      backdrop-filter: blur(0.5rem)
    button, a
      flex-grow: 1
</style>
