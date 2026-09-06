<script setup lang="ts">
  import setHeadMeta from '&/setHeadMeta'
  import AboutCard from '+/home/cards/AboutCard.vue'
  import LocationCard from '+/home/cards/LocationCard.vue'
  import Grid from '+/layout/Grid.vue'
  import MoreLinks from '+/links/MoreLinks.vue'
  import SocialLinks from '+/links/SocialLinks.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import Hero from '+/utils/Hero.vue'
  import { LinksNavLink } from '$/NavLinks'

  const { t } = useI18n()

  setHeadMeta({
    page: 'pages.links',
    subtitle: 'meta.subtitles.links',
  })
</script>

<template>
  <div class="contentView">
    <Hero :link="LinksNavLink">
      <h2>{{ t('meta.subtitles.links') }}</h2>
    </Hero>

    <!-- About -->
    <Grid class="spaced">
      <AboutCard />
      <LocationCard />
    </Grid>

    <SocialLinks />
    <MoreLinks />
    <BottomFooter />
  </div>
</template>
