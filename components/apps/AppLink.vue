<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'

  const localePath = useLocalePath()
  const { t } = useI18n()

  const props = defineProps<{
    to: string
    disabled?: boolean
    label?: string
  }>()

  const isExternal = computed(() => {
    return /^https?:\/\//.test(props.to)
  })
</script>

<template>
  <Component
    :is="isExternal ? 'a' : 'RouterLink'"
    :href="isExternal ? to : undefined"
    :to="!isExternal ? localePath(to) : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="app-link"
  >
    <button :disabled="disabled ?? false" class="appLinkButton">
      <Icon
        :icon="
          disabled
            ? 'solar:clock-circle-line-duotone'
            : 'solar:arrow-right-up-line-duotone'
        "
      />

      {{ disabled ? t('apps.buttons.soon') : (label ?? t('apps.buttons.go')) }}
    </button>
  </Component>
</template>

<style scoped lang="sass">
  .appLinkButton
    text-wrap: nowrap
</style>
