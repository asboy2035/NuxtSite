<script setup lang="ts">
  import { ref } from "vue"

  import Card from "@/components/layout/Card.vue"
  import VStack from "@/components/layout/VStack.vue"
  import HStack from "@/components/layout/HStack.vue"
  import FullscreenCover from "@/components/premade/FullscreenCover.vue"
  import SitePicker from "@/components/premade/navbar/SitePicker.vue"
  import DynamicImage from "@/components/utils/DynamicImage.vue"
  import { Icon } from "@iconify/vue"

  const showSiteSwitcher = ref(false)

  function toggleSiteSwitcher() {
    showSiteSwitcher.value = !showSiteSwitcher.value
  }
</script>

<template>
  <fullscreen-cover :class="{ hidden: !showSiteSwitcher }">
    <site-picker>
      <button @click="toggleSiteSwitcher()" style="border-radius: 2rem">
        <Icon icon="mingcute:close-fill" width="24" height="24" />
      </button>
    </site-picker>
  </fullscreen-cover>

  <card class="stackModeOnly">
    <h-stack>
      <h-stack>
        <dynamic-image src="/images/avatar.png" alt="ash's Avatar" radius="2rem" class="bigAvatar" />
        <v-stack>
          <h-stack>
            <h1>ash</h1>
            <h1 class="light">asboy2035</h1>
          </h-stack>
        </v-stack>
      </h-stack>

      <button @click="toggleSiteSwitcher">
        <Icon icon="stash:globe-duotone" width="24" height="24" />
        Sites
      </button>
    </h-stack>
  </card>
</template>