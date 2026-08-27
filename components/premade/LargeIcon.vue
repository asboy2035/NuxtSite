<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  defineProps<{
    icon: string
    tint: string
  }>()
</script>

<template>
  <div class="largeIconContainer" :style="{ '--tint': tint, '--scale': 1 }">
    <div class="largeIcon">
      <Icon :icon="icon" />
      <div class="largeIconBackground" />
    </div>
  </div>
</template>

<style scoped lang="sass">
  .largeIconContainer
    justify-content: center
    align-items: center
    padding: var(--contentPadding)

    .largeIcon
      justify-content: center
      align-items: center
      animation: largeIconSpinIn 0.4s ease forwards

      width: 100%
      aspect-ratio: 1/1

      cursor: pointer

      &:hover:not(:active)
        svg
          scale: 1.1

        .largeIconBackground
          box-shadow: 0 0 4rem var(--tint)
          transform: rotate(10deg)

      svg
        transform: rotate(25deg)
        width: 50%
        height: 50%
        filter: drop-shadow(0 0 2rem rgb(73 73 73 / 0.6))
        opacity: 0.8
        animation: largeIconContentScale 0.4s ease forwards
        transition: 0.2s ease

      .largeIconBackground
        position: absolute
        width: 100%
        height: 100%
        background: linear-gradient(-45deg, var(--tint), hsl(from var(--tint) calc(h + 40) s l))
        z-index: -1
        border-radius: 35%
        opacity: 0.7
        box-shadow: 0 0 3rem var(--tint)
        transition: 0.2s ease

  @keyframes largeIconSpinIn
    from
      transform: rotate(25deg) scale(0)
    to
      transform: rotate(-25deg) scale(1)

  @keyframes largeIconContentScale
    from
      transform: scale(0.4) rotate(25deg)
    to
      transform: scale(1) rotate(25deg)
</style>
