<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import HStack from '+/layout/HStack.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  const { t } = useI18n()

  defineProps<{
    to: string
    title: string
    icon: string
  }>()
</script>

<template>
  <SafeLink :to="to">
    <HStack class="sitePick">
      <div class="icon">
        <Icon :icon="icon" />
      </div>

      <h3>{{ t(title) }}</h3>
    </HStack>
  </SafeLink>
</template>

<style scoped lang="sass">
  .sitePick
    .icon
      width: 2.75rem
      height: 2.75rem
      padding: 0.1rem
      background: var(--foregroundColor)
      align-items: center
      justify-content: center
      border-radius: 1.25rem

    .icon > ::v-deep(svg)
      width: 1.5rem
      height: 1.5rem
</style>
