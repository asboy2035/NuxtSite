<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { onMounted, ref } from 'vue'

  import Card from '+/layout/Card.vue'
  import VStack from '+/layout/VStack.vue'
  import SitePick from '+/premade/navbar/SitePick.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Spacer from '+/utils/Spacer.vue'
  const { t } = useI18n()

  defineProps<{
    index?: number
  }>()

  const isOldMain = ref(false)
  const showingShareModal = ref(false)

  function isOldMainHost(): boolean {
    const host = window.location.href
    return host.includes('pages.dev')
  }

  onMounted(() => {
    isOldMain.value = isOldMainHost()
  })
</script>

<template>
  <VStack class="sitePicker">
    <Card :index="index" v-if="!showingShareModal">
      <VStack class="fullWidth">
        <CardTitle title="sites.title" icon="solar:three-squares-line-duotone">
          <!-- Insert close button here -->
          <slot />
        </CardTitle>

        <SitePick
          title="sites.search"
          to="https://search.a35hie.me"
          icon="solar:magnifier-line-duotone"
        />

        <SitePick
          to="https://guides.a35hie.me/"
          title="sites.guides"
          icon="solar:book-line-duotone"
        />

        <SitePick
          title="sites.repos"
          to="https://repos.a35hie.me"
          icon="solar:inbox-archive-line-duotone"
        />

        <SitePick
          to="https://byg.gg"
          title="sites.big"
          icon="solar:posts-carousel-vertical-line-duotone"
          updated
        />

        <SitePick
          to="https://fonts.a35hie.me/"
          title="sites.fonts"
          icon="solar:text-line-duotone"
        />
      </VStack>
    </Card>

    <Card :index="index ? index + 1 : undefined">
      <CardTitle
        title="sharing.title"
        icon="solar:square-share-line-line-duotone"
      />
      <h3 class="light">a35.dev</h3>

      <button
        class="fullWidth"
        id="showShareCode"
        @click="showingShareModal = !showingShareModal"
      >
        <Icon icon="solar:qr-code-line-duotone" />
        {{ t(showingShareModal ? 'sharing.hideQr' : 'sharing.showQr') }}
      </button>

      <VStack v-if="showingShareModal">
        <Spacer />
        <img
          class="qrCode hiddenDark"
          src="/images/QR-Light.webp"
          alt="QR Code"
        />
        <img
          class="qrCode hiddenLight"
          src="/images/QR-Dark.webp"
          alt="QR Code"
        />
      </VStack>
    </Card>
  </VStack>
</template>

<style lang="sass">
  .sitePicker
    max-width: 100%

  .qrCode
    width: 100%
    max-width: 20rem !important
    opacity: 0.9
    cursor: none
</style>
