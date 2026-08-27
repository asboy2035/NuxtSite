<script setup lang="ts">
  import type { Project } from ':/project'
  import HStack from '+/layout/HStack.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import VStack from '+/layout/VStack.vue'
  import ProjectStackItem from '+/projects/ProjectStackItem.vue'
  import SafeLink from '+/utils/SafeLink.vue'

  const { t } = useI18n()

  defineProps<{
    project: Project
  }>()
</script>

<template>
  <SafeLink :to="project.link">
    <InteriorItem class="projectView">
      <VStack class="projectInfo">
        <img
          :src="
            project.preview ? project.preview : '/images/default-project.png'
          "
          alt="Project preview"
        />

        <h3>{{ project.name }}</h3>
        <p class="light">{{ project.description }}</p>

        <HStack class="autoSpace fullWidth">
          <HStack class="projectStack">
            <ProjectStackItem
              v-for="technology in project.technologies"
              :technology="technology"
            />
          </HStack>

          <button class="prominent goButton">
            {{ t('apps.buttons.go') }}
          </button>
        </HStack>
      </VStack>
    </InteriorItem>
  </SafeLink>
</template>

<style scoped lang="sass">
  .projectView
    height: 100%

    .projectInfo
      height: 100%
      justify-content: space-between

      img
        border-radius: 1rem

      .projectStack
        background: var(--foregroundColor)
        padding: 0.5rem

      .goButton
        min-width: 5rem

  @media (max-width: 35rem)
    .projectView
      .projectInfo
        img, .projectStack
          border-radius: 1.25rem
</style>
