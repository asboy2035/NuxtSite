<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type { Service } from ':/service'
  import HStack from '+/layout/HStack.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import VStack from '+/layout/VStack.vue'

  const { t } = useI18n()

  defineProps<{
    service: Service
  }>()
</script>

<template>
  <InteriorItem class="serviceItem">
    <HStack class="noWrap serviceItemContent">
      <VStack class="serviceImage">
        <p class="serviceStatus">{{ service.state.name }}</p>
        <img :src="service.iconUrl" :alt="`${service.name} icon`" />
      </VStack>

      <VStack class="serviceInfo">
        <h3>{{ service.name }}</h3>
        <p class="light">{{ service.description }}</p>
      </VStack>
    </HStack>

    <HStack class="serviceLinks fullWidth">
      <a v-if="service.vcsUrl" :href="service.vcsUrl">
        {{ t('services.source') }}
      </a>

      <a :href="service.url">
        <button class="prominent">
          <Icon icon="solar:cloud-check-line-duotone" />
          {{ t('services.use') }}
        </button>
      </a>
    </HStack>
  </InteriorItem>
</template>

<style scoped lang="sass">
  .serviceItem
    gap: 0.75rem

    .serviceItemContent
      justify-content: flex-start
      width: 100%

      .serviceImage
        position: relative
        flex-shrink: 0
        flex-grow: 0

        .serviceStatus
          position: absolute
          bottom: -0.25rem
          right: -0.25rem
          padding: 0.25rem 0.5rem

          border-radius: 10rem
          border: 0.1rem solid var(--shadowColor)
          background: var(--accentColor)
          font-weight: bold

        img
          width: 4rem
          height: 4rem

      .serviceInfo
        gap: 0
        flex-grow: 1
        flex-shrink: 1
        overflow: scroll
        border-radius: 0

        *
          text-wrap: nowrap

    .serviceLinks
      a
        flex-grow: 1

        button
          width: 100%
</style>
