<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type { AppCategory } from ':/appsViews'
  import AppLink from '+/apps/AppLink.vue'
  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import VStack from '+/layout/VStack.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'

  defineProps<{
    appsData: AppCategory[]
    index?: number
  }>()
</script>

<template>
  <VStack id="appsContainer">
    <Card
      v-for="(category, i) in appsData"
      :key="category.name"
      :index="index ? index + i : undefined"
    >
      <CardTitle :title="category.name" :icon="category.icon" />

      <Grid class="appGrid">
        <InteriorItem
          v-for="app in category.apps"
          :key="app.name"
          class="appCard"
        >
          <div class="appIcon">
            <DynamicImage
              class="appIcon"
              :src="app.image"
              :alt="app.name + ' Logo'"
            />
          </div>

          <div class="appDetails">
            <h3>{{ app.name }}</h3>
            <p class="light">{{ app.description }}</p>
          </div>

          <div class="appDownloads">
            <AppLink :to="app.link" :disabled="app.disabled ?? false" />

            <a v-if="app.github" :href="app.github">
              <button class="transparent">
                <Icon icon="mingcute:github-fill" width="24" height="24" />
              </button>
            </a>
          </div>
        </InteriorItem>
      </Grid>
    </Card>
  </VStack>
</template>

<style scoped lang="sass">
  #appsContainer
    width: 100%

  .appGrid
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
    gap: 0.5rem

  .appCard
    flex-direction: row
    gap: 0.25rem
    padding: 0.75rem
    align-items: center
    background: var(--foregroundColor)

    ::v-deep(svg)
      width: 1.25rem
      height: 1.25rem

  .appIcon
    position: relative
    border-radius: 0.9rem
    width: 3.5rem
    height: 3.5rem

  .appDetails
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    flex-grow: 1
    overflow: scroll
    scrollbar-width: none
    text-wrap: nowrap
    border-radius: 0.5rem

    p, h3
      margin: 0.1rem 0.25rem

  .appDownloads
    display: flex
    flex-direction: row
    gap: 0.5rem
    align-items: center
    justify-content: center

  @media (max-width: 25rem)
    .appGrid
      grid-template-columns: 100%
</style>
