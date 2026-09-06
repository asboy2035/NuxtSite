<script setup lang="ts">
  import setHeadMeta from '&/setHeadMeta'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import LauncherCard from '+/premade/navbar/LauncherCard.vue'
  import Hero from '+/utils/Hero.vue'
  import { LauncherCreators } from '$/launchers/LauncherCreators'
  import { CreatorsNavLink } from '$/NavLinks'
  const { t } = useI18n()

  setHeadMeta({
    page: 'pages.creators',
    subtitle: 'meta.subtitles.creators',
  })
</script>

<template>
  <div class="contentView">
    <Hero :link="CreatorsNavLink">
      <h2>{{ t('creators.choose') }}</h2>
    </Hero>

    <LauncherCard
      title="creators.tools"
      icon="solar:sledgehammer-line-duotone"
      base-url="/creator"
      :launcher-items="LauncherCreators"
    />

    <BottomFooter />
  </div>
</template>
