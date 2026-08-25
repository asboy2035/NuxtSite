<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import setHeadMeta from '&/setHeadMeta'
  import AppsCategoryList from '+/apps/AppsCategoryList.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import Hero from '+/utils/Hero.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { apps } from '$/apps'

  const { t } = useI18n()
  const route = useRoute()

  setHeadMeta({
    page: 'pages.work',
    subtitle: 'meta.subtitles.work',
  })

  onMounted(() => {
    if (route.query.scroll) {
      navigateTo(`#${route.query.scroll}`)
    }
  })
</script>

<template>
  <div class="contentView">
    <Hero icon="solar:widget-3-bold-duotone" tint="#378be7">
      <h1>{{ t('pages.work') }}</h1>
      <h2>{{ t('meta.subtitles.work') }}</h2>
      <Spacer />
      <a href="https://github.com/a35hie?tab=repositories">
        <button id="allAppsButton">
          <Icon icon="mingcute:github-fill" width="24" height="24" />
          {{ t('apps.allApps') }}
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
