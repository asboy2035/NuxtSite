<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import SafeLink from '+/utils/SafeLink.vue'

  const { t } = useI18n()
</script>

<template>
  <SafeLink to="https://a35hie.com/projects" class="fullWidth">
    <button class="fullWidth comButton prominent">
      <span class="a35hieCom">a35hie.com</span>
      {{ t('apps.allProjects') }}
      <Icon icon="solar:arrow-right-line-duotone" />
    </button>
  </SafeLink>
</template>

<style scoped lang="sass">
  .comButton
    padding: 0.5rem
    font-weight: 600
    font-size: 1.25rem
    gap: 0.75rem

    .a35hieCom
      background: var(--backgroundColor)
      padding: 0.5rem 0.75rem
      border-radius: 0.75rem
      font-style: italic
      font-size: 1rem
</style>
