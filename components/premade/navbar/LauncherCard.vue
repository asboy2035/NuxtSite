<script setup lang="ts">
  import type LauncherItem from ':/LauncherItem'
  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  const { t } = useI18n()

  defineProps<{
    title: string
    icon: string
    baseUrl: string
    launcherItems: LauncherItem[]
    index?: number
  }>()
</script>

<template>
  <Card :index="index" class="quickContainer">
    <SafeLink :to="baseUrl">
      <CardTitle :title="t(title)" :icon="icon" />
    </SafeLink>

    <HStack class="tight">
      <SafeLink
        v-for="launcherItem in launcherItems"
        :key="launcherItem.name"
        :to="launcherItem.link"
      >
        <InteriorItem>
          <HStack>
            <DynamicImage
              class="launcherImage"
              :src="launcherItem.icon"
              :alt="launcherItem.name + ' icon'"
              radius="0.35rem"
            />
            <p>{{ launcherItem.name }}</p>
          </HStack>
        </InteriorItem>
      </SafeLink>
    </HStack>
  </Card>
</template>

<style scoped lang="sass">
  .launcherImage
    width: 2rem
    height: 2rem

    &::after
      content: ""
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      border-radius: 0.75rem
      border: 0.1rem var(--shadowColor) solid
      mask: conic-gradient(from 45deg, black, transparent, black, transparent, black)
      opacity: 0.4
</style>
