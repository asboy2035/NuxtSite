<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { MoreLinks } from '$/SocialLinks'
  const { t } = useI18n()
</script>

<template>
  <Card :index="4" class="spaced">
    <CardTitle title="links.more" icon="solar:menu-dots-line-duotone" />

    <HStack>
      <a v-for="link in MoreLinks" :href="link.url" target="_blank">
        <button>
          <Icon :icon="link.icon" />
          {{ link.name }}
        </button>
      </a>
    </HStack>

    <h3>{{ t('links.playlists') }}</h3>
    <HStack>
      <SafeLink to="/playlists/topsongs">
        <button>
          <Icon icon="solar:music-note-outline" />
          Top Songs
        </button>
      </SafeLink>
    </HStack>
  </Card>
</template>
