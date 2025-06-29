<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import HStack from "~/components/layout/HStack.vue"

defineProps<{
  title: string
  subtitle?: string
}>()

const sentinel = ref<HTMLElement | null>(null)
const isStuck = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
      ([entry]) => {
        isStuck.value = !entry.isIntersecting
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -1px 0px' // Prevents flickering at the exact intersection point
      }
  )

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }

  onBeforeUnmount(() => {
    if (sentinel.value) {
      observer.unobserve(sentinel.value)
    }
    observer.disconnect()
  })
})
</script>

<template>
  <div>
    <!-- Sentinel positioned at the top, this is what we observe -->
    <div ref="sentinel" class="sentinel" aria-hidden="true" />

    <div class="nav-title-wrapper" :class="{ stuck: isStuck }">
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

.sentinel
  position: absolute
  top: 0
  height: 1px
  width: 100%
  pointer-events: none

.nav-title-wrapper
  display: flex
  justify-content: flex-start
  align-items: flex-start
  position: relative
  z-index: 100
  backdrop-filter: blur(2rem)
  transition: 0.2s ease-out
  border-radius: 0

.stuck
  position: fixed
  top: 0
  left: 0
  right: 0
  width: 100%
  max-width: calc(100vw - 2rem)
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
  border-bottom: 0.1rem colors.$shadowColor solid
  opacity: 0.2
</style>