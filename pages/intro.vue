<script setup>
  import { Icon } from '@iconify/vue'

  import setHeadMeta from '&/setHeadMeta'
  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Divider from '+/utils/Divider.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import Spacer from '+/utils/Spacer.vue'

  const { t } = useI18n()

  setHeadMeta({
    page: 'pages.home',
    subtitle: 'meta.subtitles.global',
    image: '/images/SitePreview.jpg',
  })

  definePageMeta({ showingNavProfile: false, showingInterfaceOptions: false })
</script>

<template>
  <div class="contentView introView">
    <VStack class="introHead">
      <img class="introAvatar" src="/images/avatar-27.webp" alt="avatar" />
      <h1 class="introTitle">{{ t('intro.hi') }}</h1>
      <h2 class="introSubtitle">
        {{ t('intro.desc') }}
      </h2>
    </VStack>

    <Divider />

    <Card class="introInfoCard spaced">
      <CardTitle title="intro.knowMe" icon="solar:hearts-line-duotone" />

      <HStack class="fullWidth autoSpace">
        <HStack>
          <SafeLink to="https://github.com/a35hie">
            <button>
              <Icon icon="mingcute:github-fill" />
              {{ t('intro.github') }}
            </button>
          </SafeLink>

          <SafeLink to="mailto:ash@a35.dev">
            <button>
              <Icon icon="solar:plain-line-duotone" />
              {{ t('intro.email') }}
            </button>
          </SafeLink>
        </HStack>

        <SafeLink to="/links">
          <button class="transparent">
            <Icon icon="solar:link-minimalistic-2-line-duotone" />
            {{ t('app.more') }}
          </button>
        </SafeLink>
      </HStack>
    </Card>

    <Spacer />

    <SafeLink to="/" class="introCta fullWidth">
      <button>
        <Icon icon="solar:info-circle-line-duotone" />
        {{ t('intro.about') }}
      </button>
    </SafeLink>
  </div>
</template>

<style scoped lang="sass">
  .introView
    container-type: inline-size
    justify-content: center

    .introHead
      width: 100%

      .introAvatar
        width: 10rem
        height: 10rem
        max-width: 100%
        max-height: 100%
        border-radius: 35%

      .introTitle
        font-size: clamp(1.5rem, 30cqw, 8rem)
        line-height: 0.9

    .introInfoCard
      max-height: fit-content

    .introCta
      max-width: 20rem
      margin-bottom: 5rem

      button
        width: 100%

  @media (max-width: 45rem)
    .introView
      justify-content: flex-start
</style>
