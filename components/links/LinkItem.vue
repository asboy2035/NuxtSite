<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import InteriorItem from "@/components/layout/InteriorItem.vue"

  defineProps<{
    name: string
    link: string
    icon: string
  }>()
</script>

<template>
  <a :href="link" target="_blank" rel="noopener noreferrer">
    <interior-item class="centered">
      <Icon :icon="icon" width="48" height="48" />
      <p>{{ name }}</p>
    </interior-item>
  </a>
</template>
