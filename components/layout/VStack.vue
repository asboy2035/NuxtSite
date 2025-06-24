<template>
  <div class="vStack">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  .vStack
    display: flex
    flex-wrap: wrap
    gap: 0.5rem
    justify-content: flex-start
    flex-direction: column
    align-items: flex-start

  .vStack.spaced
    row-gap: 1rem
    column-gap: 0
</style>