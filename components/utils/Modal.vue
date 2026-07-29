<script setup lang="ts">
  import Card from '+/layout/Card.vue'
  import FullscreenCover from '+/premade/FullscreenCover.vue'

  defineProps<{
    plain?: boolean
  }>()
</script>

<template>
  <FullscreenCover class="modalCover">
    <Card class="modalCard" v-if="!plain">
      <slot />
    </Card>

    <slot v-else />
  </FullscreenCover>
</template>
