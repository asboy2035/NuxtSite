<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import InteriorItem from "@/components/layout/InteriorItem.vue"
  import Grid from "@/components/layout/Grid.vue"
  import Spacer from "@/components/utils/Spacer.vue"
  import {Icon} from "@iconify/vue"
  import CardTitle from "@/components/utils/CardTitle.vue"
  import HStack from "~/components/layout/HStack.vue";
</script>

<template>
  <card class="spaced">
    <card-title
      title="Languages"
      icon="solar:earth-line-duotone"
    />

    <p>I speak English, French, and a bit of Spanish :)</p>
    <spacer />

    <grid class="tight spaced">
      <interior-item class="centered langCard">
        <h-stack>
          <Icon icon="proicons:vuejs" width="24" height="24"/>
          <Icon icon="lineicons:nuxt" width="24" height="24" />
        </h-stack>
        <p>Vue/Nuxt</p>
      </interior-item>

      <interior-item class="centered langCard">
        <Icon icon="proicons:css-2" width="24" height="24" />
        <p>CSS</p>
      </interior-item>

      <interior-item class="centered langCard">
        <Icon icon="fluent:javascript-16-regular" width="16" height="16" />
        <p>JS</p>
      </interior-item>

      <interior-item class="centered langCard">
        <Icon icon="iconoir:apple-swift" width="24" height="24" />
        <p>Swift</p>
      </interior-item>
    </grid>
  </card>
</template>

<style scoped lang="sass">
  .langCard > ::v-deep(svg)
    width: 3rem
    height: 3rem
</style>