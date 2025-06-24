<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const isLoaded = ref(false)
  const imgEl = ref<HTMLImageElement | null>(null)

  defineProps<{
    src: string
    alt?: string
    width?: string
    height?: string
    radius?: string
  }>()

  function handleLoad() {
    isLoaded.value = true
  }

  onMounted(() => {
    if (imgEl.value?.complete) {
      handleLoad()
    }
  })
</script>

<template>
  <div
    class="image-wrapper"
    :style="{ width, height, borderRadius: radius }"
  >
    <img
      ref="imgEl"
      :src="src"
      :alt="alt"
      :class="{ loaded: isLoaded }"
      @load="handleLoad"
      class="image"
      draggable="false"
    />
  </div>
</template>

<style scoped lang="sass">
  .image-wrapper
    display: block
    overflow: hidden
    position: relative
    border-radius: 1rem

  .image
    width: 100%
    height: 100%
    object-fit: cover
    filter: blur(1rem)
    transition: filter 0.3s ease, scale 0.3s ease
    transform: scale(1.5)
    will-change: filter, transform

  .image.loaded
    filter: blur(0)
    transform: scale(1)
</style>