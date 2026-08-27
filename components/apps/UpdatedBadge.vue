<template>
  <div class="updatedBadge">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  .updatedBadge
    position: relative
    border-radius: 10rem
    border: 0.1rem solid rgb(160 29 255 / 0.4)
    background: var(--foregroundColor)
    color: #efeaff
    padding: 0.5rem 0.75rem
    animation: pulse 3s infinite ease-in-out
    z-index: 2

    &::after
      position: absolute
      content: ""
      top: 0
      bottom: 0
      left: 0
      right: 0
      filter: blur(2rem)
      background: indigo
      z-index: -1
</style>
