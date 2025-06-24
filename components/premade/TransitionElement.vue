<script setup>
  import {Icon} from "@iconify/vue"
  import { ref } from 'vue'

  const isActive = ref(false)

  function show() {
    isActive.value = true
  }

  function hide() {
    isActive.value = false
  }

  defineExpose({ show, hide })
</script>

<template>
  <div
    class="progressBar"
    :class="{ active: isActive }"
  />

  <div
    class="transitionElement"
    :class="{ active: isActive }"
  >
    <Icon
      icon="svg-spinners:90-ring-with-bg"
      width="24" height="24"
      class="spinner"
    />
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .transitionElement
    position: fixed
    display: flex
    align-items: center
    justify-content: center
    top: 0
    bottom: 0
    left: 0
    right: 0

    background: colors.$foregroundColor
    backdrop-filter: blur(3rem)
    border-radius: 0
    z-index: 2
    cursor: none
    transform: translateY(-100%)
    transition: 0.3s ease

  .transitionElement.active
    transform: translateY(0%)

  .progressBar
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 0.25rem
    z-index: 7

    transform: translateX(-100%)
    background: colors.$accentColor

  .progressBar.active
    animation: progressActive 1s ease

  .progressBar::before
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

    background: colors.$accentColor
    filter: blur(0.5rem)
    opacity: 0.6

  @keyframes progressActive
    0%
      transform: translateX(-100%)

    50%
      transform: none

    100%
      transform: translateY(-100%)

  .spinner
    width: 4rem
    height: 4rem
</style>