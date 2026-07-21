<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import HStack from '+/layout/HStack.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import StarhopGame from '~/components/games/StarhopGame.vue'

  const props = defineProps<{
    error?: { statusCode?: number; statusMessage?: string }
  }>()
  const { t } = useI18n()

  const statusCode = computed(() => props.error?.statusCode ?? 404)
  const isNotFound = computed(() => statusCode.value === 404)
  const title = computed(() =>
    isNotFound.value ? t('error.title404') : t('error.titleDefault')
  )
  const message = computed(() =>
    isNotFound.value
      ? t('error.message404')
      : props.error?.statusMessage || t('error.messageDefault')
  )
</script>

<template>
  <div class="contentView errorShell">
    <div class="errorContent">
      <div class="errorText">
        <p class="eyebrow">{{ t('error.label') }} {{ statusCode }}</p>
        <h1>{{ title }}</h1>
        <p class="lead">{{ message }}</p>

        <HStack class="actions">
          <SafeLink to="/"
            ><button class="prominent">
              <Icon icon="solar:home-angle-line-duotone" />
              {{ t('error.goHome') }}
            </button></SafeLink
          >

          <SafeLink to="/starhop"
            ><button class="transparent">
              <Icon icon="solar:gamepad-line-duotone" />
              {{ t('error.openFullGame') }}
            </button></SafeLink
          >
        </HStack>
      </div>

      <div class="errorGame">
        <StarhopGame />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  .errorContent
    display: grid
    gap: 2rem
    grid-template-columns: 1fr
    margin: 0 auto

  .errorText
    align-items: flex-start
    text-align: left

  .actions
    gap: 0.75rem
    margin-top: 1rem

  .errorGame
    width: 100%

  @media (min-width: 900px)
    .errorContent
      grid-template-columns: 0.85fr 1.15fr
      align-items: center
</style>
