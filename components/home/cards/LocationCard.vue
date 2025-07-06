<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import CardTitle from "@/components/utils/CardTitle.vue"
</script>

<template>
  <card class="autoSpace locationCard">
    <card-title
      title="Bordeaux, FR"
      icon="solar:point-on-map-line-duotone"
    />

    <div class="locationImage">
      <img src="/images/France.svg" alt="Map of France" />
      <p class="locationCaption">Credit: WikiMedia</p>
    </div>
  </card>
</template>

<style scoped lang="sass">
  .locationImage
    display: flex
    justify-content: center
    margin-left: -2rem
    margin-right: -2rem
    margin-bottom: -2rem
    width: calc(100% + 4rem)
    height: 15rem
    flex-grow: 1
    mask: linear-gradient(to top, black, black, transparent)
    opacity: 1
    overflow: hidden

    img
      border-radius: 0

    .locationCaption
      opacity: 0.8
      position: absolute
      bottom: 0.5rem
</style>
