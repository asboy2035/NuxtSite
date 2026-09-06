<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import setHeadMeta from '&/setHeadMeta'
  import AppsCategoryList from '+/apps/AppsCategoryList.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import Hero from '+/utils/Hero.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { apps } from '$/apps'
  import { WorkNavLink } from '$/NavLinks'

  const { t } = useI18n()

  setHeadMeta({
    page: 'pages.work',
    subtitle: 'meta.subtitles.work',
  })
</script>

<template>
  <div class="contentView">
    <Hero :link="WorkNavLink">
      <h2>{{ t('meta.subtitles.work') }}</h2>

      <Spacer />

      <a href="https://repos.a35hie.me" target="_blank">
        <button id="allReposButton">
          <Icon icon="mingcute:github-fill" />
          {{ t('apps.allRepos') }}
        </button>
      </a>
    </Hero>

    <ProjectsCard id="projects" :index="1" />

    <AppsCategoryList :apps-data="apps" />

    <p class="light">
      <a
        id="installPwaLink"
        href="https://g.a35.dev/misc/web/pwaInstall"
        target="_blank"
        class="prominentLink"
      >
        {{ t('apps.pwaInstall') }}
      </a>
    </p>

    <BottomFooter />
  </div>
</template>

<style scoped lang="sass">
  .servicesGrid
    gap: 0.5rem
</style>
