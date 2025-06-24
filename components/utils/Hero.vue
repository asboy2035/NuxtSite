<script>
  import DynamicImage from "@/components/utils/DynamicImage.vue"
  import {ProgressiveBlur} from "vue-progressive-blur"

  export default {
    components: {DynamicImage, ProgressiveBlur},
    props: {
      image: String,
      imageAlt: String ?? "Image"
    }
  }
</script>

<template>
  <div class="hero-v2">
    <dynamic-image class="heroResizableImage" :src="image" :alt="imageAlt" />

    <div class="heroInset">
      <div class="heroText">
        <slot />
      </div>
      <progressive-blur
        class="heroBlur"
        :blur="64"
        :border-radius="32"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/fonts"

  .hero-v2
    display: flex
    position: relative
    align-items: flex-start
    justify-content: flex-end
    min-height: fit-content
    height: 75vh
    max-height: 80vw
    width: 100%
    overflow: hidden

  .heroInset
    display: flex
    align-items: flex-start
    margin: 1.5rem
    height: fit-content
    max-height: calc(100% - 2rem)

  .heroText
    z-index: 3
    align-items: flex-start

  ::v-deep(h1)
    font-family: fonts.$prominent
    font-style: italic
    color: white
    font-weight: 500
    font-size: 5rem
    margin: 0 0.25rem

  ::v-deep(h1), ::v-deep(h2), ::v-deep(p)
    color: white

  .hero-v2 .heroResizableImage
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0

    object-fit: cover
    border-radius: 2rem
    width: 100%
    height: 100%
    z-index: 1
    opacity: 0.8

  .heroBlur
    display: flex
    position: absolute
    z-index: 2
    flex-grow: 1
    width: 100%
    max-height: 70%
    margin-top: 30%

  @media (max-width: 35rem)
    .hero
      height: fit-content
      align-items: flex-start

    .heroBlur
      max-height: calc(100% - 2rem)

    .hero-v2
      max-height: 75vh
</style>