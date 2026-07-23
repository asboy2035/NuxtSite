<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { marked } from 'marked'
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import setHeadMeta from '&/setHeadMeta'
  import AppStoreIcon from '+/apps/AppStoreIcon.vue'
  import GithubIcon from '+/apps/GithubIcon.vue'
  import LinkIcon from '+/apps/LinkIcon.vue'
  import UpdatedBadge from '+/apps/UpdatedBadge.vue'
  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import Hero from '+/utils/Hero.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import type { AppPageMeta } from '$/appsPages'
  import { appsPages } from '$/appsPages'
  const { t } = useI18n()

  const route = useRoute()
  const slug: string = route.params.slug as string
  const app: AppPageMeta | undefined = appsPages.find(
    (app) => app.slug === slug
  ) as AppPageMeta | undefined
  const longDescriptionRaw: Ref<string> = ref('')

  // Add computed property to render Markdown
  const longDescription = computed(() => {
    return marked(longDescriptionRaw.value)
  })

  onMounted(async () => {
    if (app) {
      const response = await fetch(app.longDescriptionMarkdown)
      longDescriptionRaw.value = await response.text()

      setHeadMeta({
        page: app.title,
        subtitle: app.ogDescription,
        image: app.socialPreview,
        icon: app.iconPath,
      })
    }
  })

  function getIcon(type: string): Component {
    switch (type) {
      case 'github':
        return GithubIcon
      case 'appstore':
        return AppStoreIcon
      default:
        return LinkIcon
    }
  }
</script>

<template>
  <div v-if="app" class="contentView">
    <Hero :image="app.headerImagePath" :image-alt="`${app.title} screenshot`">
      <UpdatedBadge v-if="app.updatedBadge">{{
        app.updatedBadge
      }}</UpdatedBadge>
      <h1>{{ app.title }}</h1>
      <h2>{{ app.shortDescription }}</h2>

      <SafeLink to="/apps">
        <button>
          <Icon icon="solar:arrow-left-line-duotone" />
          {{ t('pages.apps') }}
        </button>
      </SafeLink>
    </Hero>

    <Card v-if="app.appLinks?.length" class="hStack autoSpace centered">
      <HStack>
        <a
          v-for="(link, index) in app.appLinks"
          :key="index"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>
            <component :is="getIcon(link.type)" class="icon" />
            {{ link.title }}
          </button>
        </a>

        <p class="brewCmd" v-if="app.brewCmd">{{ app.brewCmd }}</p>
      </HStack>
    </Card>

    <!-- Markdown Info -->
    <Card v-html="longDescription" />

    <BottomFooter />
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/fonts"

  .brewCmd
    font-family: fonts.$mono
    opacity: 0.7
    user-select: all
    -webkit-user-select: all
    scale: 0.9
</style>
