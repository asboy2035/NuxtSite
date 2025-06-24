<script setup lang="ts">
  import HStack from "@/components/layout/HStack.vue"
  import {Icon} from "@iconify/vue"

  defineProps<{
    title: string
    icon: string
  }>()
</script>

<template>
  <h-stack class="sitePicker">
    <div class="icon">
      <Icon :icon="icon" />
    </div>

    <h3>{{ title }}</h3>
  </h-stack>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .icon
    width: 2.5rem
    height: 2.5rem
    padding: 0.1rem
    background: colors.$foregroundColor
    align-items: center
    justify-content: center
    border-radius: 1rem

  .icon > ::v-deep(svg)
    width: 1.5rem
    height: 1.5rem

  .sitePicker
    padding-right: 1rem
</style>