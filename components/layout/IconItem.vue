<script setup lang="ts">
  import { getIcon, Icon, loadIcons } from '@iconify/vue'
  import { onBeforeUnmount, ref, watch } from 'vue'

  import InteriorItem from '+/layout/InteriorItem.vue'

  const props = defineProps<{
    name: string
    link?: string
    icon: string
    tag?: string
    light?: boolean
    colored?: boolean
  }>()

  const maskUrl = ref<string | null>(null)
  const loading = ref(false)

  let unsubscribe: (() => void) | undefined

  const createMaskUrl = (iconData: ReturnType<typeof getIcon>) => {
    if (!iconData) return null

    const width = iconData.width ?? 24
    const height = iconData.height ?? 24

    const svg = [
      `<svg xmlns="http://www.w3.org/2000/svg"`,
      ` viewBox="${iconData.left ?? 0} ${iconData.top ?? 0} ${width} ${height}">`,
      iconData.body,
      '</svg>',
    ].join('')

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  }

  const loadMask = (icon: string) => {
    maskUrl.value = null

    if (!props.colored) return

    const existing = getIcon(icon)

    if (existing) {
      maskUrl.value = createMaskUrl(existing)
      return
    }

    loading.value = true

    unsubscribe?.()

    unsubscribe = loadIcons([ icon ], () => {
      loading.value = false

      const data = getIcon(icon)

      if (data) {
        maskUrl.value = createMaskUrl(data)
      }
    })
  }

  watch(
    () => [ props.icon, props.colored ] as const,
    ([ icon ]) => loadMask(icon),
    { immediate: true }
  )

  onBeforeUnmount(() => {
    unsubscribe?.()
  })
</script>

<template>
  <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">
    <InteriorItem class="centered iconItem" :class="{ light, colored }">
      <div v-if="tag" class="tag">{{ tag }}</div>

      <div class="iconContainer">
        <span
          v-if="colored && maskUrl"
          class="iconMask"
          :style="{ '--icon-mask': maskUrl }"
        />

        <Icon v-if="!colored || !maskUrl" class="iconFallback" :icon="icon" />
        <Icon v-if="colored && maskUrl" class="iconHover" :icon="icon" />
      </div>

      <p>{{ name }}</p>
    </InteriorItem>
  </a>

  <InteriorItem v-else class="centered iconItem" :class="{ light, colored }">
    <div v-if="tag" class="tag">{{ tag }}</div>

    <div class="iconContainer">
      <Icon class="iconFallback" :icon="icon" />
    </div>

    <p>{{ name }}</p>
  </InteriorItem>
</template>

<style scoped lang="sass">
  .iconItem
    .tag
      position: absolute
      top: 0.75rem
      right: 0.75rem
      padding: 0.25rem 0.5rem
      border-radius: 1rem
      background: var(--accentColor)

    .iconContainer
      position: relative
      width: 3rem
      height: 3rem

      svg,
      .iconMask
        width: 100%
        height: 100%
        transition: opacity 0.2s ease

      .iconMask,
      .iconHover
        position: absolute

      .iconMask
        display: block
        opacity: 1
        background: white

        mask-image: var(--icon-mask)
        mask-mode: luminance
        mask-repeat: no-repeat
        mask-position: center
        mask-size: contain

        -webkit-mask-image: var(--icon-mask)
        -webkit-mask-repeat: no-repeat
        -webkit-mask-position: center
        -webkit-mask-size: contain

      .iconHover
        display: block
        opacity: 0
        filter: none

      .iconFallback
        filter: grayscale(1)
        transition: opacity 0.2s ease

      &:has(.iconMask)
        .iconFallback
          display: none

    &:hover
      .iconMask
        opacity: 0

      .iconHover
        opacity: 1
</style>
