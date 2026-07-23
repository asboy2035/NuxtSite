<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import setHeadMeta from '&/setHeadMeta'
  import AppsCategoryList from '+/apps/AppsCategoryList.vue'
  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import ServiceItem from '+/services/ServiceItem.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Hero from '+/utils/Hero.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { apps } from '$/apps'
  import { Services } from '$/Services'
  const { t } = useI18n()

  setHeadMeta({
    page: 'pages.work',
    subtitle: 'meta.subtitles.work',
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

    <ProjectsCard :index="1" />

    <AppsCategoryList :apps-data="apps" />

    <Card :index="3" class="spaced">
      <CardTitle title="services.title" icon="solar:cloud-line-duotone" />

      <Grid class="servicesGrid">
        <ServiceItem v-for="service in Services" :service="service" />
      </Grid>
    </Card>

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

    <BottomFooter :index="2" />
  </div>
</template>

<style scoped lang="sass">
  .servicesGrid
    gap: 0.5rem
</style>
