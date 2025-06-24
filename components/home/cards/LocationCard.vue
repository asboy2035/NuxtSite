<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import DynamicImage from "@/components/utils/DynamicImage.vue"
  import InteriorItem from "@/components/layout/InteriorItem.vue";
  import CardTitle from "@/components/utils/CardTitle.vue";
</script>

<template>
  <card class="autoSpace">
    <card-title
      title="Bordeaux, FR"
      icon="solar:point-on-map-line-duotone"
    />

    <interior-item>
      <dynamic-image class="locationImage" src="/images/Bordeaux.webp" alt="Place de la Bourse, Bordeaux, France" />
    </interior-item>
  </card>
</template>

<style scoped lang="sass">
  .locationImage
    border-radius: 0.25rem
</style>
