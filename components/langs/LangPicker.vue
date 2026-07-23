<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { LocaleObject } from '@nuxtjs/i18n'

  import Grid from '+/layout/Grid.vue'

  const { locale, locales, setLocale } = useI18n()

  const emit = defineEmits([ 'set' ])

  function setLang(locale: LocaleObject): void {
    setLocale(locale.code)
    emit('set')
  }
</script>

<template>
  <ClientOnly>
    <Grid class="langList tight">
      <button
        v-for="l in locales"
        :key="l.code"
        :class="{ active: locale === l.code }"
        @click="setLang(l)"
      >
        <Icon
          :icon="
            locale === l.code
              ? 'solar:check-circle-line-duotone'
              : 'solar:earth-line-duotone'
          "
        />
        {{ l.name }}
      </button>
    </Grid>
  </ClientOnly>
</template>

<style scoped lang="sass">
  .langList
    width: 100%
    gap: 0.5rem

    button
      width: 100%

      &.active
        background: var(--shadowColor)
        color: var(--textColor)
</style>
