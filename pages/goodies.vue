<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Card from "@/components/layout/Card.vue"
  import Spacer from "@/components/utils/Spacer.vue"
  import VStack from "@/components/layout/VStack.vue"
  import Grid from "@/components/layout/Grid.vue"
  import Hero from "@/components/utils/Hero.vue"
  import HStack from "@/components/layout/HStack.vue"
  import BottomFooter from "@/components/premade/BottomFooter.vue"
  import Navbar from "@/components/premade/navbar/Navbar.vue"
  import {Icon} from "@iconify/vue"
  import CardTitle from "@/components/utils/CardTitle.vue"

  useHead({
    title: "ash's Goodies",
    meta: [
      { name: "description", content: "Misc stuff from me." },
      { property: "og:title", content: "ash's Goodies" },
      { property: "og:description", content: "Misc stuff from me." },
      { property: "og:image", content: "/images/Goodies.jpg" }
    ]
  })

  interface CursorAsset {
    type: string
    path: string
  }

  interface Cursor {
    name: string
    version: string
    downloadURL: string
    assets: CursorAsset[]
  }

  const cursors = ref<Cursor[]>([])

  onMounted(async () => {
    try {
      const response = await fetch("https://api.asboy2035.com/cursors")
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)
      cursors.value = await response.json()
    } catch (error) {
      console.error("Error fetching cursors:", error)
    }
  })
</script>

<template>
  <div class="contentView">
    <hero image="/images/Goodies.jpg">
      <h1>Goodies</h1>
      <h2>Other downloadable content.</h2>

      <h-stack>
        <a href="https://asboy.gumroad.com">
          <button>
            <icon icon="mingcute:gumroad-fill" />
            Gumroad
          </button>
        </a>
      </h-stack>
    </hero>

    <grid class="spaced">
      <!-- Cursors Card -->
      <card>
        <card-title
          title="Cursors"
          icon="solar:cursor-line-duotone"
        />

        <p class="light">macOS cursors</p>
        <spacer />

        <v-stack class="fullWidth">
          <v-stack v-for="cursor in cursors" :key="cursor.name" class="spaced">
            <h3>{{ cursor.name }}</h3>
            <h-stack class="scrollable">
              <div v-for="asset in cursor.assets" :key="asset.type" class="cursorAsset">
                <img :src="asset.path" :alt="asset.type" />
                <p>{{ asset.type }}</p>
              </div>
            </h-stack>
            <a download :href="cursor.downloadURL">
              <button>
                <Icon icon="iconoir:finder" width="24" height="24" />
                Download
              </button>
            </a>
          </v-stack>
        </v-stack>
      </card>

      <!-- Wallpapers Card -->
      <card>
        <card-title
          title="Wallpapers"
          icon="solar:wallpaper-line-duotone"
        />

        <p class="light">Wallpapers for any device.</p>
        <p class="light">Coming soon.</p>
      </card>
    </grid>

    <bottom-footer />
    <navbar />
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .cursorAsset
    background: colors.$foregroundColor
    border-radius: 1rem
    padding: 0.5rem

  .cursorAsset > img
    height: 3rem
    width: 3rem
</style>
