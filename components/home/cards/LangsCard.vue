<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import Grid from "@/components/layout/Grid.vue"
  import Spacer from "@/components/utils/Spacer.vue"
  import CardTitle from "@/components/utils/CardTitle.vue"
  import IconItem from "~/components/layout/IconItem.vue"
</script>

<template>
  <card class="spaced">
    <card-title
      title="Languages"
      icon="solar:earth-line-duotone"
    />

    <p>I speak English, French, and a bit of Spanish :)</p>
    <spacer />

    <h3>Programming Languages:</h3>
    <grid class="tight spaced">
      <icon-item
        name="Vue/Nuxt"
        icon="proicons:vuejs"
      />

      <icon-item
        name="CSS"
        icon="proicons:css-2"
      />

      <icon-item
        name="JS"
        icon="fluent:javascript-16-regular"
      />

      <icon-item
        name="Swift"
        icon="iconoir:apple-swift"
      />
    </grid>
  </card>
</template>

<style scoped lang="sass">
  .langCard > ::v-deep(svg)
    width: 3rem
    height: 3rem
</style>