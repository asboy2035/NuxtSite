<script setup lang="ts">
  import RingGame from '+/games/RingGame.vue'
  definePageMeta({ layout: 'plain' })
  const { t } = useI18n()
  useSeoMeta({
    title: () => t('ring.title'),
    description: () => t('ring.description'),
  })
</script>

<template>
  <main class="ringPage"><RingGame /></main>
</template>

<style scoped lang="sass">
  .ringPage
    position: relative
    z-index: 1
    display: grid
    min-height: 100dvh
    place-items: center
    padding: 1rem
</style>
