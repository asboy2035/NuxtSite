<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { BundledLanguage } from 'shiki'

  import HStack from '+/layout/HStack.vue'

  const { t } = useI18n()

  interface Props {
    code: string
    lang?: 'text' | BundledLanguage | 'txt' | 'plain'
    filename?: string
    showHeader?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    lang: 'text',
    showHeader: true,
  })

  const copied = ref(false)

  async function copyCode() {
    if (!navigator.clipboard) return

    await navigator.clipboard.writeText(props.code)

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 1500)
  }
</script>

<template>
  <div class="codeBlock dark">
    <HStack v-if="showHeader" class="codeHeader">
      <span class="code-language">
        {{ filename || lang }}
      </span>

      <button class="copyButton" @click="copyCode">
        <Icon
          :icon="copied ? 'solar:copy-bold-duotone' : 'solar:copy-line-duotone'"
        />
        {{ t('copy') }}
      </button>
    </HStack>

    <Shiki :code="code" :lang="lang" class="code" />
  </div>
</template>

<style scoped lang="sass">
  .codeBlock
    width: 100%
    overflow: hidden
    border-radius: 1.5rem
    background: var(--backgroundColor)
    color: var(--textColor)
    border: 0.1rem solid var(--foregroundDark)

    *
      font-family: var(--monoFont) !important

  .codeHeader
    justify-content: space-between
    width: 100%
    padding: 0.75rem
    opacity: 0.6

  .copyButton
    padding: 0.25rem 0.5rem
    cursor: pointer
    transition: 0.2s ease

  .code
    width: 100%
    margin: 0
    overflow-x: scroll
    padding: 0 0.75rem 0.75rem
    user-select: text
    -webkit-user-select: text

    :deep(code)
      background-color: transparent !important
</style>
