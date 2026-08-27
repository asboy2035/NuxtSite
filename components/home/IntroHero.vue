<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { ProgressiveBlur } from 'vue-progressive-blur'

  import HStack from '+/layout/HStack.vue'
  import SafeLink from '+/utils/SafeLink.vue'

  const { t } = useI18n()
</script>

<template>
  <div class="hero">
    <div class="heroMedia">
      <SafeLink
        to="https://vgen.co/r_ikaillust/portfolio/showcase/a35hie-s-headshot-bust-up/516bb94b-750a-4a74-9873-3ab27b7a6125"
      >
        <button class="heroMediaAttribution">
          <Icon icon="solar:pallete-2-line-duotone" />
          {{ t('intro.artBy', { artist: 'r_ikaillust' }) }}
        </button>
      </SafeLink>

      <img class="heroImage" src="/images/MikuTransparent.webp" alt="Miku" />

      <div class="heroBlurContainer">
        <ProgressiveBlur class="heroBlur" :blur="24" :border-radius="0" />
      </div>
    </div>

    <div class="heroContent">
      <h1 class="heroTitle">
        {{ t('home.intro') }}
      </h1>

      <p>{{ t('intro.desc') }}</p>

      <HStack class="fullWidth autoSpace heroButtons">
        <HStack>
          <SafeLink to="https://github.com/a35hie">
            <button>
              <Icon icon="mingcute:github-fill" />
              {{ t('intro.github') }}
            </button>
          </SafeLink>

          <SafeLink to="mailto:ash@a35.dev">
            <button>
              <Icon icon="solar:plain-line-duotone" />
              {{ t('intro.email') }}
            </button>
          </SafeLink>
        </HStack>

        <SafeLink to="/links">
          <button class="transparent">
            <Icon icon="solar:link-minimalistic-2-line-duotone" />
            {{ t('app.more') }}
          </button>
        </SafeLink>
      </HStack>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .hero
    margin-top: -2.5rem
    position: relative
    width: 100%
    z-index: 1
    display: flex
    flex-direction: column

    &Media
      position: relative
      width: 100%
      height: 70vh
      display: flex
      flex-direction: column
      overflow: hidden
      z-index: 1

      // slight ease at the top, bigger fade at the bottom so the image
      // dissolves into whatever's underneath and lines up with where the
      // progressive blur takes over - keeps the overlaid text legible
      mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 55%, transparent 100%)
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 55%, transparent 100%)

      &:hover
        .heroMediaAttribution
          opacity: 1

      &Attribution
        position: absolute
        top: 40%
        z-index: 2
        opacity: 0
        background: var(--foregroundOpaque)

        &::after
          opacity: 0.6

    &Image
      width: 100%
      height: 100%
      object-fit: cover
      display: block
      animation: scaleIn 0.3s ease forwards

    &BlurContainer
      position: absolute
      left: 0
      right: 0
      bottom: 0
      height: 65%
      display: flex
      flex-direction: column
      pointer-events: none
      z-index: 1

    &Blur
      width: 100%
      height: 100%

    &Content
      position: absolute
      inset: 0
      z-index: 2
      display: flex
      flex-direction: column
      justify-content: flex-end
      pointer-events: none
      padding: 1rem
      text-align: center
      animation: slideIn 0.3s ease forwards

      > *
        pointer-events: auto

    &Buttons
      margin-top: 1.5rem
      max-width: 30rem

    // desktop
    @media (min-width: 60rem)
      flex-direction: row
      align-items: flex-start
      height: 65vh
      max-height: 65vh
      overflow: visible

      &Media
        position: relative
        width: 55%
        height: 80vh
        flex-shrink: 0
        overflow: visible
        // combine two fades: the edge that meets the text column, and a
        // vertical fade (small ease at top, bigger fade at bottom into the
        // overflow area) - intersect multiplies the two masks together
        mask-composite: intersect
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 60%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 55%, transparent 100%)
        -webkit-mask-composite: source-in, source-in

      &Image
        object-fit: cover
        object-position: top center

      &Content
        position: relative
        inset: auto
        z-index: 2
        width: 45%
        flex: 1
        height: 100%
        justify-content: center
        align-items: flex-start
        text-align: start
        padding: 0
        margin-inline-end: 0.5rem

      &Title
        font-size: 2rem

    @keyframes scaleIn
      0%
        transform: scale(0.4)
      100%
        transform: scale(1)

    @keyframes slideIn
      0%
        transform: translateY(20%)
      100%
        transform: translateY(0)
</style>
