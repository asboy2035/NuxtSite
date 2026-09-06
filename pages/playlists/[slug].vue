<script setup lang="ts">
  import { computed, onMounted } from 'vue'

  import setHeadMeta from '&/setHeadMeta'
  import LinkIcon from '+/apps/LinkIcon.vue'
  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import HStack from '+/layout/HStack.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import VStack from '+/layout/VStack.vue'
  import AppleMusic from '+/playlists/AppleMusic.vue'
  import Deezer from '+/playlists/Deezer.vue'
  import Spotify from '+/playlists/Spotify.vue'
  import YoutubeMusic from '+/playlists/YoutubeMusic.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Hero from '+/utils/Hero.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { PlaylistsNavLink } from '$/NavLinks'
  import { playlists } from '$/playlists'

  const { t } = useI18n()
  const route = useRoute()

  const playlist = computed(() =>
    playlists.find((p) => p.slug === route.params.slug)
  )

  onMounted(async () => {
    if (playlist.value) {
      setHeadMeta({
        page: playlist.value.title,
        subtitle: playlist.value.description,
        icon: playlist.value.image,
        group: 'Playlist',
      })
    }
  })

  function getIconComponent(type: string): Component {
    switch (type) {
      case 'apple':
        return AppleMusic
      case 'spotify':
        return Spotify
      case 'deezer':
        return Deezer
      case 'youtube':
        return YoutubeMusic
      default:
        return LinkIcon
    }
  }
</script>

<template>
  <div v-if="playlist" class="contentView">
    <Hero :link="PlaylistsNavLink">
      <h1>{{ playlist.title }}</h1>
    </Hero>

    <Card class="spaced">
      <HStack class="spaced">
        <img
          class="playlistArt"
          :src="playlist.image"
          :alt="`${playlist.title} playlist cover`"
        />
        <VStack>
          <h3 class="light">{{ t('playlists.by') }} {{ playlist.author }}</h3>
          <p class="light">{{ playlist.description }}</p>
        </VStack>
      </HStack>
      <Spacer />

      <CardTitle
        title="playlists.streamTitle"
        icon="solar:headphones-square-line-duotone"
      />

      <p class="light">{{ t('playlists.streamDesc') }}</p>

      <grid class="tight spaced">
        <a
          v-for="link in playlist.links"
          :key="link.type"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InteriorItem class="centered">
            <component :is="getIconComponent(link.type)" class="icon" />
            <p>{{ link.title }}</p>
          </InteriorItem>
        </a>
      </grid>
    </Card>

    <BottomFooter />
  </div>
</template>

<style scoped lang="sass">
  .playlistArt
    border-radius: 1rem
    width: 14rem

  @media (max-width: 35rem)
    .playlistArt
      width: 100%
</style>
