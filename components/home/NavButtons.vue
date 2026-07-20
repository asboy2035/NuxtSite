<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import HStack from '+/layout/HStack.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { NavLinks } from '$/NavLinks'

  const { t } = useI18n()
</script>

<template>
  <HStack class="edgeToEdge" id="navButtons">
    <Icon icon="solar:arrow-right-line-duotone" />
    <SafeLink v-for="link in NavLinks" :to="link.link">
      <button>
        <Icon v-if="link.icon" :icon="link.icon" />
        {{ t(link.text) }}
      </button>
    </SafeLink>

    <a href="https://github.com/main35/NuxtSite" aria-labelledby="viewSrc">
      <button
        class="transparent"
        aria-label="View Source Code"
        id="viewSrc"
        style="scale: 1.5"
      >
        <Icon
          icon="solar:code-line-duotone"
          width="24"
          height="24"
          aria-labelledby="viewSrc"
        />
      </button>
    </a>
  </HStack>
</template>
