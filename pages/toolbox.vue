<script setup lang="ts">
  import HStack from "~/components/layout/HStack.vue"
  import {Icon} from "@iconify/vue"
  import VStack from "~/components/layout/VStack.vue"
  import Card from "~/components/layout/Card.vue"
  import CardTitle from "~/components/utils/CardTitle.vue"
  import {onMounted, ref} from "vue";
  import type {AppCategory} from "~/types/appsViews"
  import Divider from "~/components/utils/Divider.vue";
  import CreatorsCard from "~/components/creator/CreatorsCard.vue";

  const appsData = ref<AppCategory[]>([])

  onMounted(async () => {
    try {
      const response = await fetch("https://api.asboy2035.com/apps")
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)
      appsData.value = await response.json()
    } catch (error) {
      console.error("Error fetching apps:", error)
    }
  })
</script>

<template>
  <div class="contentView toolboxView">
    <v-stack id="headerLinks">
      <h-stack>
        <h1>Toolbox</h1>
        <h1 class="light">asboy2035</h1>
      </h-stack>

      <card>
        <card-title
          title="Quick Links"
          icon="solar:bolt-line-duotone"
        />

        <a href="https://guides.asboy2035.com/">
          <button>
            <Icon icon="solar:book-line-duotone" />
            Guides
          </button>
        </a>
      </card>
      <creators-card />

      <divider />

      <card-title
        title="Apps"
        icon="solar:widget-2-line-duotone"
      />
      <apps-category-list :apps-data="appsData" />
    </v-stack>
  </div>
</template>

<style scoped lang="sass">
  #headerLinks
    width: 100%
    justify-content: flex-start

  .toolboxView
    padding-bottom: 3rem
</style>