<script setup lang="ts">
  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import HStack from '+/layout/HStack.vue'
  import IconItem from '+/layout/IconItem.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { Langs } from '$/TechStack'

  const { t } = useI18n()
</script>

<template>
  <Card :index="2" class="langsCard spaced">
    <CardTitle title="home.languages.title" icon="solar:earth-line-duotone" />

    <p>{{ t('home.languages.desc') }}</p>
    <Spacer />

    <h3>{{ t('home.languages.programming') }}</h3>
    <HStack class="noSpace">
      <p>{{ t('home.languages.using') }}</p>
      <p>/</p>
      <p class="light">{{ t('home.languages.learning') }}</p>
      <p>:</p>
    </HStack>

    <Grid class="langsGrid spaced">
      <IconItem
        v-for="lang in Langs"
        :name="lang.name"
        :icon="lang.icon"
        :link="lang.link"
        :light="lang.isLearning"
      />
    </Grid>
  </Card>
</template>

<style scoped lang="sass">
  .langsGrid
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)) !important

  @media (max-width: 35rem)
    .langsGrid
      grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr)) !important
</style>
