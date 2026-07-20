<script setup lang="ts">
  import setHeadMeta from '&/setHeadMeta'
  import Card from '+/layout/Card.vue'
  import MoreLinks from '+/links/MoreLinks.vue'
  import SocialLinks from '+/links/SocialLinks.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import Description from '+/premade/Description.vue'
  import Hero from '+/utils/Hero.vue'

  const { t } = useI18n()

  setHeadMeta({
    page: 'pages.links',
    subtitle: 'meta.subtitles.links',
  })
</script>

<template>
  <div class="contentView">
    <Hero icon="solar:link-minimalistic-2-line-duotone" tint="#af58eb">
      <h1>{{ t('pages.links') }}</h1>
      <h2>{{ t('meta.subtitles.links') }}</h2>
    </Hero>

    <!-- About -->
    <Card>
      <description />
    </Card>

    <SocialLinks />
    <MoreLinks />
    <BottomFooter />
  </div>
</template>
