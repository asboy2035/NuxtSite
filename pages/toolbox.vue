<script setup lang="ts">
  import {Icon} from "@iconify/vue"
  import VStack from "~/components/layout/VStack.vue"
  import Card from "~/components/layout/Card.vue"
  import CardTitle from "~/components/utils/CardTitle.vue"
  import {onMounted, ref} from "vue"
  import type {AppCategory} from "~/types/appsViews"
  import Divider from "~/components/utils/Divider.vue"
  import CreatorsCard from "~/components/creator/CreatorsCard.vue"
  import NavigationTitle from "~/components/layout/NavigationTitle.vue"
  import BottomFooter from "~/components/premade/BottomFooter.vue"
  import HStack from "~/components/layout/HStack.vue"
  import Modal from '~/components/utils/Modal.vue'

  const appsData = ref<AppCategory[]>([])
  const showingAboutModal = ref(false)

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
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/images/icons/Toolbox.png" },
    ]
  })
</script>

<template>
  <div class="contentView toolboxView">
    <v-stack id="headerLinks">
      <NavigationTitle
        title="Toolbox"
        subtitle="asboy2035"
      >
        <button @click="showingAboutModal = !showingAboutModal">
          <icon
            v-if="!showingAboutModal"
            class="growIn"
            icon="solar:info-circle-line-duotone"
          />

          <icon
            v-else-if="showingAboutModal"
            class="spinIn"
            icon="mingcute:close-fill"
          />
        </button>
      </NavigationTitle>

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

          <a href="https://github.com/asboy2035/NuxtSite">
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

    <modal v-if="showingAboutModal">
      <img
        src="/images/icons/Toolbox.png" alt="Toolbox Icon"
        class="toolboxIcon"
      />

      <h1>About</h1>
      <h3>Toolbox is the one-stop shop for all resources and apps by me.</h3>

      <p>Here, you can find apps, tools, and more, right from one app that you can add directly to your home screen.</p>

      <a
        href="https://guides.asboy2035.com/misc/web/pwaInstall"
        target="_blank"
      >
        <button>
          <icon icon="solar:download-minimalistic-line-duotone" />
          How to Install
        </button>
      </a>
    </modal>
  </div>
</template>

<style scoped lang="sass">
  #headerLinks
    width: 100%
    justify-content: flex-start

  .toolboxView
    padding-bottom: 3rem

  .toolboxIcon
    width: 4rem
    height: auto
    border-radius: 1.5rem !important
</style>