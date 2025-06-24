<script setup lang="ts">
  import { ref } from 'vue'

  const isActive = ref(false)

  function show() {
    isActive.value = true
  }

  function hide() {
    isActive.value = false
  }

  defineExpose({ show, hide })
</script>

<template>
   <div class="transitionable" :class="{ active: isActive }">
     <slot />
   </div>
</template>

<style scoped lang="sass">
  .transitionable
    display: flex
    transition: opacity 1.2s ease
    opacity: 1

  .transitionable.active
    opacity: 0
</style>