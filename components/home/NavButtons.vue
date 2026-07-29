<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import VStack from '+/layout/VStack.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { NavLinks } from '$/NavLinks'

  const { t } = useI18n()
</script>

<template>
  <VStack class="fullWidth" id="navButtons">
    <SafeLink v-for="link in NavLinks" :to="link.link" class="fullWidth">
      <button class="transparent navButton">
        <Icon v-if="link.icon" :icon="link.icon" />
        {{ t(link.text) }}
      </button>
    </SafeLink>
  </VStack>
</template>

<style scoped lang="sass">
  .navButton
    width: 100%
    transition: 0.2s ease
    justify-content: flex-start

    svg
      transition: 0.2s ease
      width: 1.5rem !important
      height: 1.5rem !important

    &:hover
      padding-inline-start: 0.5rem

      svg
        transform: rotate(10deg)
</style>
