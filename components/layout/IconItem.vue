<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import InteriorItem from '+/layout/InteriorItem.vue'

  defineProps<{
    name: string
    link?: string
    icon: string
    tag?: string
    light?: boolean
  }>()
</script>

<template>
  <a
    v-if="link"
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    :class="{ light: light }"
  >
    <InteriorItem class="centered iconItem">
      <div class="tag" v-if="tag">{{ tag }}</div>

      <Icon :icon="icon" />
      <p>{{ name }}</p>
    </InteriorItem>
  </a>

  <InteriorItem
    v-if="!link"
    class="centered iconItem"
    :class="{ light: light }"
  >
    <div class="tag" v-if="tag">{{ tag }}</div>

    <Icon :icon="icon" />
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

    svg
      width: 3rem
      height: 3rem
</style>
