<script setup lang="ts">
  import {Icon} from "@iconify/vue"
  import VStack from "~/components/layout/VStack.vue"
  import Card from "~/components/layout/Card.vue"
  import CardTitle from "~/components/utils/CardTitle.vue"
  import {onMounted, ref} from "vue";
  import type {AppCategory} from "~/types/appsViews"
  import Divider from "~/components/utils/Divider.vue"
  import CreatorsCard from "~/components/creator/CreatorsCard.vue"
  import NavigationTitle from "~/components/layout/NavigationTitle.vue"
  import BottomFooter from "~/components/premade/BottomFooter.vue"
  import HStack from "~/components/layout/HStack.vue";

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

  useHead({
    title: "Toolbox ∙ asboy2035",
    meta: [
      { name: "description", content: "asboy2035 Toolbox app." },
      { property: "og:title", content: "Toolbox ∙ asboy2035" },
      { property: "og:description", content: "asboy2035 Toolbox app." },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
    ]
  })
</script>

<template>
  <div class="contentView toolboxView">
    <v-stack id="headerLinks">
      <NavigationTitle
        title="Toolbox"
        subtitle="asboy2035"
      />

      <card>
        <card-title
          title="Quick Links"
          icon="solar:bolt-line-duotone"
        />

        <h-stack>
          <a href="https://guides.asboy2035.com/">
            <button>
              <Icon icon="solar:book-line-duotone" />
              Guides
            </button>
          </a>

          <a href="https://github.com/asboy2035/asboy2035">
            <button>
              <Icon icon="mingcute:github-fill" />
              GitHub
            </button>
          </a>
        </h-stack>
      </card>
      <creators-card />

      <divider />

      <card-title
        title="Apps"
        icon="solar:widget-2-line-duotone"
      />
      <apps-category-list :apps-data="appsData" />
    </v-stack>

    <bottom-footer hide-read-more />
  </div>
</template>

<style scoped lang="sass">
  #headerLinks
    width: 100%
    justify-content: flex-start

  .toolboxView
    padding-bottom: 3rem
</style>