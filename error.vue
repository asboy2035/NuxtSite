<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import SafeLink from '+/utils/SafeLink.vue'

  definePageMeta({ layout: 'plain' })

  const props = defineProps<{
    error?: { statusCode?: number; statusMessage?: string }
  }>()
  const { t } = useI18n()

  const statusCode = computed(() => props.error?.statusCode ?? 404)
  const message = computed(() =>
    statusCode.value === 404
      ? t('error.message404')
      : props.error?.statusMessage || t('error.messageDefault')
  )
</script>

<template>
  <main class="errorShell">
    <div class="errorContent">
      <p>{{ t('error.label') }}</p>
      <h1>{{ statusCode }}</h1>
      <p class="lead">{{ message }}</p>
      <div class="actions">
        <SafeLink to="/"
          ><button class="prominent">
            <Icon icon="solar:home-angle-line-duotone" />{{ t('error.goHome') }}
          </button></SafeLink
        >
        <SafeLink to="/ring"
          ><button class="transparent">
            <Icon icon="solar:gamepad-line-duotone" />{{ t('error.playRing') }}
          </button></SafeLink
        >
      </div>
    </div>
  </main>
</template>

<style scoped lang="sass">
  .errorShell
    position: relative
    z-index: 1
    display: grid
    min-height: 100dvh
    place-items: center
    padding: 2rem
  .errorContent
    max-width: 38rem
    text-align: center
    h1
      margin: 0
      font-size: clamp(8rem, 30vw, 20rem)
      line-height: .8

  .actions
    gap: 0.75rem
    margin-top: 1rem
</style>
