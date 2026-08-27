<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { LocaleObject } from '@nuxtjs/i18n'
  import { computed, ref, watch } from 'vue'

  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'

  const { locale, locales, setLocale } = useI18n()
  const { t } = useI18n()

  type LangItem = Pick<LocaleObject, 'code' | 'name' | 'language'>
  type LocaleCode = typeof locale.value

  const emit = defineEmits<{
    set: []
  }>()

  const query = ref('')
  const pendingCode = ref(locale.value)
  const activeIndex = ref(0)

  const normalizedLocales = computed<LangItem[]>(() =>
    locales.value.map(({ code, name, language }) => ({
      code,
      name,
      language,
    }))
  )

  const filteredLocales = computed(() => {
    const search = query.value.trim().toLowerCase()
    if (!search) return normalizedLocales.value

    return normalizedLocales.value.filter((item) =>
      `${item.name} ${item.code}`.toLowerCase().includes(search)
    )
  })

  const activeLocale = computed(() => filteredLocales.value[activeIndex.value])
  const pendingLocale = computed(() =>
    normalizedLocales.value.find((item) => item.code === pendingCode.value)
  )

  const flagIcon = (language?: string) => {
    const country = language?.split('-')[1]
    return `circle-flags:${country?.toLowerCase() ?? 'un'}`
  }

  const setPending = (code: LocaleCode) => {
    pendingCode.value = code
  }

  const moveActive = (delta: number) => {
    if (!filteredLocales.value.length) return

    const next = activeIndex.value + delta
    const maxIndex = filteredLocales.value.length - 1
    if (next < 0) {
      activeIndex.value = maxIndex
      return
    }

    if (next > maxIndex) {
      activeIndex.value = 0
      return
    }

    activeIndex.value = next
  }

  const onInputKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      moveActive(1)
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      moveActive(-1)
      return
    }

    if (event.key === 'Enter' && activeLocale.value) {
      event.preventDefault()
      setPending(activeLocale.value.code)
    }
  }

  const confirmLanguage = () => {
    if (!pendingLocale.value) return

    setLocale(pendingLocale.value.code)
    emit('set')
  }

  watch(
    () => filteredLocales.value,
    (items) => {
      if (!items.length) {
        activeIndex.value = 0
        return
      }

      activeIndex.value = Math.min(activeIndex.value, items.length - 1)
    },
    { immediate: true }
  )

  watch(
    () => locale.value,
    (value) => {
      pendingCode.value = value
    },
    { immediate: true }
  )
</script>

<template>
  <VStack class="modernLangPicker fullWidth">
    <HStack class="searchBox fullWidth">
      <Icon icon="solar:magnifer-line-duotone" />
      <input
        v-model="query"
        type="text"
        :placeholder="t('home.languages.find')"
        @keydown="onInputKeydown"
      />
    </HStack>

    <div class="langChips fullWidth" role="listbox" aria-label="Languages">
      <button
        v-for="(item, index) in filteredLocales"
        :key="item.code"
        class="langChip"
        :class="{
          prominent: pendingCode === item.code,
          current: locale === item.code,
          active: activeIndex === index,
        }"
        @click="setPending(item.code)"
      >
        <Icon class="langIcon" :icon="flagIcon(item.language)" />
        {{ item.name }}
      </button>
    </div>

    <button
      class="confirm fullWidth prominent"
      :disabled="!pendingLocale"
      @click="confirmLanguage"
    >
      <Icon icon="solar:global-line-duotone" />
      {{ t('home.languages.confirm', { language: pendingLocale?.name }) }}
    </button>
  </VStack>
</template>

<style scoped lang="sass">
  .searchBox
    input
      flex-grow: 1

  .modernLangPicker
    gap: 0.75rem

  .langChips
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr))
    gap: 0.5rem

    .langChip
      justify-content: flex-start

      &.current
        .langCode
          opacity: 1

  .langCode
    font-size: 0.75rem
    opacity: 0.6
</style>
