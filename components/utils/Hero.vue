<script setup lang="ts">
  import Card from '+/layout/Card.vue'
  import VStack from '+/layout/VStack.vue'
  import LargeIcon from '+/premade/LargeIcon.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'

  defineProps<{
    image?: string
    imageAlt?: string
    icon?: string
    tint?: string
  }>()
</script>

<template>
  <Card class="hero" :class="{ compact: !image }">
    <DynamicImage
      class="heroResizableImage"
      v-if="image"
      :src="image"
      :alt="imageAlt ?? 'Image'"
    />

    <LargeIcon class="heroIcon" v-if="icon && tint" :icon="icon" :tint="tint" />

    <p v-else>invalid props</p>

    <VStack class="heroContent">
      <slot />
    </VStack>
  </Card>
</template>

<style scoped lang="sass">
  @use "@/styles/fonts"

  .hero
    justify-content: flex-end
    z-index: 2
    height: fit-content
    overflow: hidden
    margin-top: 1rem

    &:not(.compact)
      min-height: 55vh
      max-height: 75vh

    .heroResizableImage
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0

      object-fit: cover
      z-index: 1

    .heroIcon
      width: 10rem
      aspect-ratio: 1/1

  .heroContent
    z-index: 5
    align-items: flex-start
    width: 100%
    gap: 0.25rem

  ::v-deep(h1)
    font-family: fonts.$prominent
    font-size: 3.5rem
    line-height: 0.9

  @media (max-width: 35rem)
    .hero
      max-height: 65vh
</style>
