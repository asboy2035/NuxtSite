<script setup lang="ts">
  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import IconItem from '+/layout/IconItem.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { SocialMediaLinks } from '$/SocialLinks'

  const { t } = useI18n()
</script>

<template>
  <Card :index="3" class="spaced">
    <CardTitle title="links.socialTitle" icon="solar:share-line-duotone" />

    <p>{{ t('links.socialDesc') }}</p>
    <Spacer />

    <Grid class="linksGrid spaced">
      <IconItem
        v-for="link in SocialMediaLinks"
        :name="link.name"
        :link="link.url"
        :icon="link.icon"
        :tag="link.lang"
        colored
      />
    </Grid>
  </Card>
</template>

<style scoped lang="sass">
  .linksGrid
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr))

  @media (max-width: 35rem)
    .linksGrid
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr))
</style>
