<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type { Technology } from ':/technology'
  import HStack from '+/layout/HStack.vue'

  const { t } = useI18n()

  defineProps<{
    technology: Technology
  }>()
</script>

<template>
  <VTooltip>
    <HStack class="projectStackItem">
      <Icon :icon="technology.icon" />
    </HStack>

    <template #popper>
      <p class="techName">{{ technology.name }}</p>
      <p v-if="technology.isLearning" class="light">
        {{ t('home.languages.learning') }}
      </p>
    </template>
  </VTooltip>
</template>

<style scoped lang="sass">
  .projectStackItem
    svg
      width: 1.5rem
      height: 1.5rem
</style>
