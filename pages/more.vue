<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import setHeadMeta from '&/setHeadMeta'
  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Hero from '+/utils/Hero.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { cursors } from '$/cursors'
  const { t } = useI18n()

  setHeadMeta({
    page: 'pages.goodies',
    subtitle: 'meta.subtitles.goodies',
  })

  function reloadPage() {
    window.location.reload()
  }
</script>

<template>
  <div class="contentView">
    <Hero icon="solar:inbox-line-bold-duotone" tint="#dfac3b">
      <h1>{{ t('pages.goodies') }}</h1>
      <h2>{{ t('meta.subtitles.goodies') }}</h2>

      <HStack>
        <a href="https://asboy.gumroad.com">
          <button id="goToGumroadButton">
            <icon icon="mingcute:gumroad-fill" />
            Gumroad
          </button>
        </a>
      </HStack>
    </Hero>

    <Card class="spaced" :index="1">
      <CardTitle
        title="goodies.wallpapers.title"
        icon="solar:wallpaper-line-duotone"
      />
      <p class="light">{{ t('goodies.wallpapers.desc') }}</p>

      <div
        id="kofi-shop-embed"
        data-shop-id="K3K21AMRZR"
        data-shop-currency="$"
        data-shop-theme="default"
        data-shop-soldout="show"
      />

      <button class="fullWidth" @click="reloadPage()">
        <Icon icon="solar:refresh-line-duotone" />
      </button>
    </Card>

    <!-- Cursors Card -->
    <Card :index="2">
      <CardTitle
        title="goodies.cursors.title"
        icon="solar:cursor-line-duotone"
      />

      <p class="light">{{ t('goodies.cursors.desc') }}</p>
      <Spacer />

      <VStack class="fullWidth">
        <VStack v-for="cursor in cursors" :key="cursor.name" class="spaced">
          <h3>{{ cursor.name }}</h3>
          <HStack class="scrollable">
            <div
              v-for="asset in cursor.assets"
              :key="asset.type"
              class="cursorAsset"
            >
              <img :src="asset.path" :alt="asset.type" />
              <p>{{ asset.type }}</p>
            </div>
          </HStack>
          <a download :href="`/cursors${cursor.downloadURL}`">
            <button>
              <Icon icon="iconoir:finder" width="24" height="24" />
              {{ t('goodies.cursors.download') }}
            </button>
          </a>
        </VStack>
      </VStack>
    </Card>

    <BottomFooter :index="3" />
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
