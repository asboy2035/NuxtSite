<script setup lang="ts"></script>
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

    background: var(--foregroundColor)
    border-radius: var(--interiorRadius)
    padding: 0.75rem
    transition: 0.2s ease
    backdrop-filter: saturate(125%)

    // Border
    &::after
      content: ""
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0

      box-shadow: inset 0 0 0.5rem var(--shadowColor)
      border-radius: var(--interiorRadius)
      opacity: 0.3
      pointer-events: none
      transition: 0.2s ease
      mask: conic-gradient(from -45deg, black, rgba(0, 0, 0, 0.2), black, rgba(0, 0, 0, 0.2), black)

    &::before // Shadow
      content: ""
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0

      box-shadow: 0 0.5rem 0.5rem var(--shadowColor)
      border-radius: var(--interiorRadius)
      opacity: 0.15
      pointer-events: none
      transition: 0.2s ease

    &:hover
      &::before
        box-shadow: 0 1rem 0.75rem var(--shadowColor)
        opacity: 0.2

      &::after
        opacity: 0.5

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
