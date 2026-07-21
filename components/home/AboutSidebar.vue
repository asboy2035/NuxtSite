<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { onMounted, ref } from 'vue'

  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import LinkTickerClient from '+/links/LinkTicker.client.vue'
  import SitePicker from '+/premade/navbar/SitePicker.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'
  import Spacer from '+/utils/Spacer.vue'
  const { t } = useI18n()

  const currentTime: Ref<string> = ref('')

  const updateTime = () => {
    const now: Date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Paris',
      hour12: false,
    }
    currentTime.value = now.toLocaleTimeString('en-GB', options)
  }

  onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
  })
</script>

<template>
  <div class="sidebarView sidebarModeOnly spaced">
    <Card :index="2">
      <VStack class="fullWidth">
        <DynamicImage
          src="/images/avatar-27.webp"
          alt="ash's Avatar"
          radius="2rem"
          class="bigAvatar"
        />

        <VStack class="name noSpace">
          <h1 class="noMargins">ash</h1>
          <h2 class="light noMargins">@a35hie</h2>
        </VStack>

        <Spacer />
        <LinkTickerClient />
      </VStack>
    </Card>

    <Card :index="3">
      <h3 v-tooltip="t('app.myTime')">{{ currentTime }}</h3>
      <HStack class="spaced">
        <a
          href="https://github.com/a35hie"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>
            <Icon icon="mingcute:github-fill" />
            GitHub
          </button>
        </a>
        <a href="mailto:ash@a35.dev" class="spaced">
          <icon icon="solar:plain-line-duotone" />
          Email
        </a>
      </HStack>
    </Card>

    <SitePicker :index="4" class="fullWidth" />
  </div>
</template>

<style scoped lang="sass">
  .sidebarView
    width: 20rem
</style>
