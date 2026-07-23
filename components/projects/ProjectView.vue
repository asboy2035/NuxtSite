<script setup lang="ts">
  import type { Project } from ':/project'
  import HStack from '+/layout/HStack.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import VStack from '+/layout/VStack.vue'
  import ProjectStackItem from '+/projects/ProjectStackItem.vue'
  import SafeLink from '+/utils/SafeLink.vue'

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

        <HStack class="projectStack">
          <ProjectStackItem
            v-for="technology in project.technologies"
            :technology="technology"
          />
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

  @media (max-width: 35rem)
    .projectView
      .projectInfo
        img
          border-radius: 1.25rem
</style>
