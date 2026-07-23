<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { LocaleObject } from '@nuxtjs/i18n'
  import { computed, ref, watch } from 'vue'

  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'

  interface LangItem extends LocaleObject {
    code: string
    name: string
  }

  const { locale, locales, setLocale } = useI18n()
  const { t } = useI18n()

  const emit = defineEmits([ 'set' ])

  const query = ref('')
  const pendingCode = ref(locale.value)
  const activeIndex = ref(0)

  const normalizedLocales = computed(() =>
    (locales.value as LangItem[]).map((item) => ({
      code: item.code,
      name: item.name,
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

  const setPending = (code: string) => {
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
    { deep: true, immediate: true }
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
  <div class="modernLangPicker fullWidth">
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
        :class="{
          selected: pendingCode === item.code,
          current: locale === item.code,
          active: activeIndex === index,
        }"
        @click="setPending(item.code)"
      >
        <span class="langName">{{ item.name }}</span>
        <span class="langCode">{{ item.code.toUpperCase() }}</span>
      </button>
    </div>

    <VStack class="actions">
      <p v-if="pendingLocale">
        {{ t('home.languages.selected') }}
        <strong>{{ pendingLocale.name }}</strong>
      </p>
      <button
        class="confirm fullWidth prominent"
        :disabled="!pendingLocale"
        @click="confirmLanguage"
      >
        {{ t('home.languages.confirm') }}
      </button>
    </VStack>
  </div>
</template>

<style scoped lang="sass">
  .searchBox
    input
      flex-grow: 1

  .modernLangPicker
    min-width: 20rem
    display: grid
    gap: 1rem

  .langChips
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr))
    gap: 0.55rem

    button
      justify-content: space-between

      &.selected
        background: var(--accentColor)

      &.current
        .langCode
          opacity: 1

  .langCode
    font-size: 0.72rem
    opacity: 0.65
</style>
