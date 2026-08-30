<template>
  <div class="interior">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  a
    .interior
      width: 100%

      &:hover
        transform: translateY(-0.5rem)

      &:active
        transform: translateY(-0.15rem)

  .interior
    position: relative
    --interiorRadius: 1.75rem

    box-shadow: inset 0 0.2rem 0.2rem 0 var(--foregroundColor)
    background: var(--foregroundColor)
    border-radius: var(--interiorRadius)
    padding: 0.75rem
    transition: 0.2s ease
    backdrop-filter: saturate(125%)

    &::before // Shadow
      content: ""
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0

      box-shadow: 0 0.5rem 0.5rem var(--shadowColor)
      border-radius: var(--interiorRadius)
      opacity: 0.1
      pointer-events: none
      transition: 0.2s ease

    &:hover
      box-shadow: inset 0 0.2rem 0.2rem 0 var(--foregroundDark)

      &::before
        box-shadow: 0 1rem 0.75rem var(--shadowColor)
        opacity: 0.15

    &:active
      &::before
        box-shadow: 0 0.35rem 0.55rem var(--shadowColor)

  ::v-deep(svg)
    width: 3rem
    height: 3rem

  @media (max-width: 35rem)
    .interior
      padding: 0.5rem
</style>
