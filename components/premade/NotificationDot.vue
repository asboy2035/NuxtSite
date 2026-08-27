<script setup lang="ts">
  defineProps<{
    count?: number
    large?: boolean
  }>()
</script>

<template>
  <div class="notificationDot" :class="{ large: large }">
    {{ count }}
    <div class="notificationDotBackground" />
  </div>
</template>

<style scoped lang="sass">
  .notificationDot
    position: relative
    min-width: 0.5rem
    min-height: 0.5rem
    width: fit-content
    background: var(--shadowColor)

    &.large
      min-width: 1rem
      min-height: 1rem

    .notificationDotBackground
      position: absolute
      border-radius: 50rem
      background: var(--shadowColor)
      opacity: 0.4
      animation: pulseNotificationDot 1s infinite
      filter: blur(0.1rem)

  @keyframes pulseNotificationDot
    0%
      top: 0
      bottom: 0
      left: 0
      right: 0

    80%
      top: -0.5rem
      bottom: -0.5rem
      left: -0.5rem
      right: -0.5rem

    100%
      opacity: 0
</style>
