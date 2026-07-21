<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { Ref } from 'vue'
  import { ref } from 'vue'

  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import LinkTickerClient from '+/links/LinkTicker.client.vue'
  import FullscreenCover from '+/premade/FullscreenCover.vue'
  import SitePicker from '+/premade/navbar/SitePicker.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'

  const showSiteSwitcher: Ref<boolean> = ref(false)

  function toggleSiteSwitcher() {
    showSiteSwitcher.value = !showSiteSwitcher.value
  }
</script>

<template>
  <FullscreenCover :class="{ hidden: !showSiteSwitcher }">
    <SitePicker>
      <button @click="toggleSiteSwitcher()" style="--buttonRadius: 2rem">
        <Icon icon="mingcute:close-fill" />
      </button>
    </SitePicker>
  </FullscreenCover>

  <Card :index="0" class="stackModeOnly">
    <HStack>
      <HStack>
        <DynamicImage
          src="/images/avatar-27.webp"
          alt="ash's Avatar"
          radius="2rem"
          class="bigAvatar"
        />
        <VStack>
          <HStack>
            <h1>ash</h1>
            <h1 class="light">@a35hie</h1>
          </HStack>
        </VStack>
      </HStack>

      <button @click="toggleSiteSwitcher">
        <Icon icon="stash:globe-duotone" width="24" height="24" />
        Sites
      </button>
    </HStack>

    <LinkTickerClient />
  </Card>
</template>
