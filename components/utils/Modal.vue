<script setup lang="ts">
  import FullscreenCover from "@/components/premade/FullscreenCover.vue"
  import Card from "@/components/layout/Card.vue"
</script>

<template>
  <fullscreen-cover class="modalCover">
    <card class="modalCard">
      <slot />
    </card>
  </fullscreen-cover>
</template>

<style scoped lang="sass">
  .modalCard
    width: fit-content
    max-width: 50rem

  .modalCover
    z-index: 5
</style>
