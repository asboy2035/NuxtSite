<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { Motion } from 'motion-v'
  import { onMounted, ref } from 'vue'

  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import VStack from '+/layout/VStack.vue'
  import ShareQr from '+/premade/navbar/ShareQr.vue'
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
  <Grid class="sitePicker spaced">
    <VStack class="fullWidth heartContainer">
      <Motion
        as="div"
        class="fullWidth"
        :transition="{ duration: 0.2, ease: 'easeInOut' }"
      >
        <Card :index="index" class="sharingCard">
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

          <Motion
            as="div"
            :initial="false"
            :animate="{
              height: showingShareModal ? 'auto' : 0,
              opacity: showingShareModal ? 1 : 0,
            }"
            :transition="{
              height: { duration: 0.2, ease: 'easeInOut' },
              opacity: { duration: 0.2 },
            }"
            class="qrWrapper"
          >
            <VStack class="fullWidth">
              <Spacer />

              <ClientOnly>
                <ShareQr class="qrCode" />
              </ClientOnly>
            </VStack>
          </Motion>
        </Card>
      </Motion>

      <Icon
        v-if="!showingShareModal"
        icon="solar:heart-shine-bold-duotone"
        class="shareHeart"
      />
    </VStack>

    <Card :index="index ? index + 1 : undefined">
      <VStack class="fullWidth">
        <CardTitle title="sites.title" icon="solar:three-squares-line-duotone">
          <slot />
        </CardTitle>

        <SitePick
          title="sites.search"
          to="https://search.a35hie.me"
          icon="solar:magnifier-line-duotone"
        />

        <SitePick
          title="sites.guides"
          to="https://guides.a35hie.me/"
          icon="solar:book-line-duotone"
        />

        <SitePick
          title="sites.repos"
          to="https://repos.a35hie.me"
          icon="solar:inbox-archive-line-duotone"
        />

        <SitePick
          title="sites.big"
          to="https://byg.gg"
          icon="solar:posts-carousel-vertical-line-duotone"
          updated
        />

        <SitePick
          title="sites.fonts"
          to="https://fonts.a35hie.me/"
          icon="solar:text-line-duotone"
        />
      </VStack>
    </Card>
  </Grid>
</template>

<style scoped lang="sass">
  .sitePicker
    .heartContainer
      height: 100%
      justify-content: space-between
      align-items: center

      .shareHeart
        width: 5rem
        height: 5rem

    .sharingCard
      height: fit-content

      .qrWrapper
        width: 100%
        overflow: hidden

      .qrCode
        width: 100%
        cursor: none
</style>
