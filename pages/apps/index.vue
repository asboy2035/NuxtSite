<script setup lang="ts">
  import Hero from "@/components/utils/Hero.vue"
  import Spacer from "@/components/utils/Spacer.vue"
  import Navbar from "@/components/premade/navbar/Navbar.vue"
  import {Icon} from "@iconify/vue"
  import AppsCategoryList from "~/components/apps/AppsCategoryList.vue"
  import BottomFooter from "@/components/premade/BottomFooter.vue"
  import { ref, onMounted } from "vue"
  import type {AppCategory} from "~/types/appsViews"

  useHead({
    title: "ash's Apps",
    meta: [
      { name: "description", content: "My web/Apple apps." },
      { property: "og:title", content: "ash's Apps" },
      { property: "og:description", content: "My web/Apple apps." },
      { property: "og:image", content: "/images/Apps.jpg"}
    ]
  })

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
  <div class="contentView">
    <hero image="/images/Apps.jpg" image-alt="Apps Header Image">
      <h1>Apps</h1>
      <h2>My web/Apple apps.</h2>
      <spacer />
      <a href="https://github.com/asboy2035?tab=repositories">
        <button>
          <Icon icon="mingcute:github-fill" width="24" height="24" />
          All Apps
        </button>
      </a>
    </hero>

    <AppsCategoryList :apps-data="appsData" />

    <p class="light">
      <a
          href="https://guides.asboy2035.com/misc/web/pwaInstall"
          target="_blank"
          class="prominentLink"
      >
        PWA Installation
      </a>
    </p>

    <bottom-footer />
    <navbar />
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  #appsContainer
    width: 100%

  .app-grid
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
    gap: 0.5rem

  .app-card-v2
    flex-direction: row
    gap: 0.75rem
    padding: 0.5rem 0.75rem
    align-items: center

    background: colors.$foregroundColor
    border-radius: 1rem
    cursor: pointer

  .app-image
    width: 3rem
    height: 3rem

  .app-details
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    flex-grow: 1
    overflow: scroll
    text-wrap: nowrap

    border-radius: 0.5rem

  .app-downloads
    display: flex
    flex-direction: row
    gap: 0.5rem
    align-items: center
    justify-content: center

  .app-downloads svg
    height: 1.25rem
</style>
