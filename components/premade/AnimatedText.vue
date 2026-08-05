<script setup lang="ts">
  import { AnimatePresence, Motion } from 'motion-v'

  const props = defineProps<{
    text: string
    characterClass?: any
  }>()
</script>

<template>
  <span>
    <template v-for="(char, index) in props.text.split('')" :key="index">
      <AnimatePresence mode="popLayout">
        <Motion
          :key="`${index}-${char}`"
          as="span"
          :class="characterClass"
          :initial="{
            opacity: 0,
            y: '100%',
          }"
          :animate="{
            opacity: 1,
            y: '0%',
          }"
          :exit="{
            opacity: 0,
            y: '-100%',
          }"
          :transition="{
            type: 'spring',
            stiffness: 500,
            damping: 35,
          }"
        >
          {{ char }}
        </Motion>
      </AnimatePresence>
    </template>
  </span>
</template>
