<script setup>
  import setHeadMeta from '&/setHeadMeta.ts'
  import LangsCard from '+/home/cards/LangsCard.vue'
  import IntroHero from '+/home/IntroHero.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'

  setHeadMeta({
    page: 'pages.home',
    subtitle: 'meta.subtitles.global',
  })

  definePageMeta({ showingNavProfile: false })
</script>

<template>
  <div class="contentView">
    <IntroHero />

    <!--More About-->
    <ProjectsCard :index="1" />
    <LangsCard />

    <BottomFooter />
  </div>
</template>
