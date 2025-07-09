<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .card
    --card-radius: 2.5rem

    width: calc(100% - 3rem)
    position: relative
    align-items: flex-start
    padding: 1.5rem
    flex-grow: 1

    border-radius: var(--card-radius)
    background: colors.$foregroundColor
    backdrop-filter: blur(2.5rem)
    z-index: 2
    overflow: hidden

    &::before
      content: ""
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0
      padding: 0.5rem

      opacity: 0.1
      border-radius: var(--card-radius)
      background: radial-gradient(circle at top left, colors.$swirly01, colors.$swirly02, colors.$swirly01)
      background-size: 200% 200%
      z-index: -1
      filter: blur(1rem)
      transition: opacity 0.4s ease

    &::after
      content: ""
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0

      border: 0.15rem solid colors.$shadowColor
      border-radius: var(--card-radius)
      opacity: 0.4
      pointer-events: none
      transition: opacity 0.4s ease
      mask: conic-gradient(from 45deg, black, rgba(0, 0, 0, 0.2), black, rgba(0, 0, 0, 0.2), black)

    &:hover
      &::before
        opacity: 0.25
        animation: swirly 10s ease-in-out infinite

      &::after
        opacity: 0.6


    ::v-deep(img)
      max-width: 100%
      border-radius: 0.75rem


  @media (max-width: 35rem)
    .card
      --card-radius: 2rem

      width: calc(100% - 2rem)
      padding: 1rem
</style>
<script setup lang="ts">
</script>