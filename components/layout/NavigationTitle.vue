<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import HStack from "~/components/layout/HStack.vue"

defineProps<{
  title: string
  subtitle?: string
}>()

const root = ref<HTMLElement | null>(null)
const isStuck = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
      ([entry]) => {
        isStuck.value = !entry.isIntersecting
      },
      { threshold: 1.0 }
  )
  if (root.value) observer.observe(root.value)

  onBeforeUnmount(() => {
    if (root.value) observer.unobserve(root.value)
  })
})
</script>

<template>
  <div>
    <div ref="sentinel" class="sentinel" aria-hidden="true" />

    <div ref="root" class="nav-title-wrapper" :class="{ stuck: isStuck }">
      <h-stack>
        <h1>{{ title }}</h1>
        <h1 class="light" v-if="subtitle">{{ subtitle }}</h1>
      </h-stack>

      <slot />
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/colors"

.nav-title-wrapper
  display: flex
  justify-content: flex-start
  align-items: flex-start
  position: relative
  z-index: 100
  backdrop-filter: blur(2rem)
  transition: 0.3s ease
  border-radius: 0 0 1rem 1rem

.stuck
  position: fixed
  top: 0
  left: 0
  width: calc(100vw - 2rem)
  padding: 1rem
  background: linear-gradient(to top, colors.$foregroundColor, colors.$backgroundColor)

.stuck::after
  content: ''
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0

  z-index: 101
  border-radius: 1rem
  border-bottom: 0.1rem colors.$shadowColor solid
  opacity: 0.2
</style>
