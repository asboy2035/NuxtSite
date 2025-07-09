<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import Grid from "@/components/layout/Grid.vue"
  import InteriorItem from "@/components/layout/InteriorItem.vue"
  import AppLink from "@/components/apps/AppLink.vue"
  import DynamicImage from "@/components/utils/DynamicImage.vue"
  import { Icon } from "@iconify/vue"
  import VStack from "~/components/layout/VStack.vue"
  import type {AppCategory} from "~/types/appsViews"

  defineProps<{
    appsData: AppCategory[]
  }>()
</script>

<template>
  <v-stack id="appsContainer">
    <card v-for="category in appsData" :key="category.name">
      <h2>{{ category.name }}</h2>
      <grid class="app-grid">
        <interior-item
            v-for="app in category.apps"
            :key="app.name"
            class="app-card-v2"
        >
          <div class="app-image">
            <dynamic-image
                class="app-image"
                :src="app.image"
                :alt="app.name + ' Logo'"
            />
          </div>

          <div class="app-details">
            <h3>{{ app.name }}</h3>
            <p class="light">{{ app.description }}</p>
          </div>

          <div class="app-downloads">
            <app-link :to="app.link" :disabled="app.disabled ?? false" />
            <a v-if="app.github" :href="app.github">
              <button class="transparent">
                <Icon icon="mingcute:github-fill" width="24" height="24" />
              </button>
            </a>
          </div>
        </interior-item>
      </grid>
    </card>
  </v-stack>
</template>

<style scoped lang="sass">
@use "@/styles/colors"

#appsContainer
  width: 100%

.app-grid
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
  gap: 0.5rem

.app-card-v2
  flex-direction: row
  gap: 0.25rem
  padding: 0.5rem 0.65rem
  align-items: center
  background: colors.$foregroundColor

  ::v-deep(svg)
    width: 1.25rem
    height: 1.25rem

.app-image
  position: relative
  border-radius: 1rem
  width: 3rem
  height: 3rem

  &::after
    content: ""
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    border-radius: 1rem
    border: 0.1rem colors.$shadowColor solid
    mask: conic-gradient(from 45deg, black, transparent, black, transparent, black)
    opacity: 0.4

.app-details
  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-start
  flex-grow: 1
  overflow: scroll
  text-wrap: nowrap
  border-radius: 0.5rem

  p, h3
    margin: 0.1rem 0.25rem

.app-downloads
  display: flex
  flex-direction: row
  gap: 0.5rem
  align-items: center
  justify-content: center

  svg
    height: 1.25rem
</style>
