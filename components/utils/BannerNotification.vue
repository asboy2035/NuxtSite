<script setup lang="ts">
  import { ref } from "vue"
  import Card from "@/components/layout/Card.vue"

  const hidden = ref(false)

  function handleAnimationEnd() {
    hidden.value = true
  }
</script>

<template>
  <div
    class="notificationContainer"
    :class="{ hidden: hidden }"
    @animationend="handleAnimationEnd"
  >
    <card class="bannerNotification">
      <slot />
    </card>
  </div>
</template>

<style scoped lang="sass">
  .notificationContainer
    position: fixed
    display: flex
    justify-content: center
    align-items: center
    top: 1rem
    left: 0
    width: 100vw
    z-index: 6
    height: fit-content

    background: transparent
    border-radius: 0

  .bannerNotification
    padding: 1.25rem
    width: fit-content
    max-width: calc(100vw - 2rem)
    transform: translateY(calc(-100% - 1rem))
    animation: notification 3s ease forwards
    animation-delay: 1s
    --card-radius: 2rem

  .bannerNotification:hover
    animation: none
    transform: translateY(0%)

  .bannerNotification::before
    display: none

  @keyframes notification
    0%
      transform: translateY(calc(-100% - 1rem))
      scale: 0.9
      filter: blur(1rem)

    15%
      transform: translateY(0%)
      scale: 1
      filter: none

    85%
      transform: translateY(0%)
      scale: 1
      filter: none

    99%
      transform: translateY(calc(-100% - 1rem))
      scale: 0.9
      filter: blur(1rem)
      display: none
</style>
