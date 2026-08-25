<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import HStack from '+/layout/HStack.vue'
  import NotificationDot from '+/premade/NotificationDot.vue'
  import SafeLink from '+/utils/SafeLink.vue'

  const { t } = useI18n()

  defineProps<{
    to: string
    title: string
    icon: string
    updated?: boolean
  }>()
</script>

<template>
  <SafeLink :to="to" class="fullWidth">
    <HStack class="sitePick">
      <div class="icon">
        <Icon :icon="icon" />
      </div>

      <h3>{{ t(title) }}</h3>

      <NotificationDot v-if="updated" />
    </HStack>
  </SafeLink>
</template>

<style scoped lang="sass">
  .sitePick
    width: 100%
    border-radius: 1.25rem
    transition: background 0.2s ease

    .icon
      width: 2.75rem
      height: 2.75rem
      padding: 0.1rem
      background: var(--foregroundColor)
      align-items: center
      justify-content: center
      border-radius: 1.25rem

      svg
        width: 1.5rem
        height: 1.5rem
        transition: transform 0.2s ease

    &:hover
      background: var(--foregroundColor)

      .icon
        background: var(--accentColor)

        svg
          transform: rotate(10deg) scale(1.1)
</style>
