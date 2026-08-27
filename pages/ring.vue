<script setup lang="ts">
  import RingGame from '+/games/RingGame.vue'

  setHeadMeta({
    page: 'ring.title',
    subtitle: 'ring.description',
  })
</script>

<template>
  <div class="ringPage contentView">
    <RingGame />
  </div>
</template>

<style scoped lang="sass">
  .ringPage
    justify-content: center
    z-index: 1
</style>
