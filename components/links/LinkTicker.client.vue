<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type SocialLink from ':/SocialLink'
  import HStack from '+/layout/HStack.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { SocialLinks } from '$/SocialLinks'

  const { t } = useI18n()
  const currentLink: Ref<SocialLink> = ref(SocialLinks.randomElement()!)
  const index = ref(0)
  let timer: number | undefined

  onMounted(() => {
    timer = window.setInterval(() => {
      index.value = (index.value + 1) % SocialLinks.length
      currentLink.value = SocialLinks[index.value]!
    }, 4000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })
</script>

<template>
  <ClientOnly>
    <HStack class="linkTicker autoSpace">
      <!-- prettier-ignore -->
      <div class="currentLink">
        <transition name="fade" mode="out-in">
          <span :key="currentLink.name">
            {{ t('links.check') }}
            <Icon class="linkIcon" :icon="currentLink.icon" />

            <a :href="currentLink.url">
              <strong>{{ currentLink.name }}</strong>
            </a>!
          </span>
        </transition>
      </div>

      <SafeLink to="/links">
        <button class="transparent">
          <Icon icon="solar:link-minimalistic-2-line-duotone" />
          {{ t('app.more') }}
        </button>
      </SafeLink>
    </HStack>
  </ClientOnly>
</template>

<style scoped lang="sass">
  .linkTicker
    width: 100%

    .currentLink
      align-items: flex-start
      opacity: 0.8

      .fade-enter-active,
      .fade-leave-active
        transition: opacity 0.6s ease

      .fade-enter-from,
      .fade-leave-to
        opacity: 0

      span
        display: flex
        align-items: center

        .linkIcon
          margin: 0 0.25rem
</style>
