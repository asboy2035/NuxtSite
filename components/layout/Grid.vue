<template>
  <div class="grid edgeToEdge">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  .grid
    display: grid
    width: 100%
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
    align-items: stretch

  .grid.tight
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr))

  @media (max-width: 20rem)
    .grid
      grid-template-columns: 100%
</style>
