<script setup lang="ts">
  defineProps<{
    index?: number
  }>()
</script>

<template>
  <div class="card" :style="'--card-index: ' + (index ?? 0)">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  .card
    --card-radius: 3rem
    --card-index: 0

    width: 100%
    position: relative
    align-items: flex-start
    padding: 1.5rem
    flex-grow: 1

    border-radius: var(--card-radius)
    background: var(--foregroundColor)
    transition: 0.2s ease
    box-shadow: inset 0.1rem 0.3rem 0.2rem 0 var(--foregroundColor)
    z-index: 2

    transform: translateY(1.5rem)
    opacity: 0.4
    animation: cardFadeIn 0.4s ease forwards
    animation-delay: calc(0.1s * var(--card-index))

    @keyframes cardFadeIn
      from
        transform: translateY(1.5rem)
        opacity: 0.4
      to
        transform: none
        opacity: 1

    ::v-deep(img)
      max-width: 100%
      border-radius: 0.75rem


  @media (max-width: 35rem)
    .card
      --card-radius: 2.25rem
      padding: 0.75rem
</style>
