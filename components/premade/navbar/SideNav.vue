<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import Navbar2 from '+/premade/navbar/Navbar2.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { NavLinks } from '$/NavLinks'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  const isHome = computed(() => {
    return route.path === '/' || route.path === localePath('/')
  })

  function isActive(target: string): boolean {
    return route.path.includes(target)
  }
</script>

<template>
  <VStack class="sideNav sidebarModeOnly">
    <SafeLink to="/" class="fullWidth">
      <HStack class="sideNavItem" :class="{ selected: isHome }">
        <img class="avatar" src="/images/avatar-27.webp" alt="Avatar" />
        <h2>ash</h2>
      </HStack>
    </SafeLink>

    <SafeLink v-for="link in NavLinks" :to="link.link" class="fullWidth">
      <HStack class="sideNavItem" :class="{ selected: isActive(link.link) }">
        <Icon
          v-if="link.icon"
          :icon="
            isActive(link.link)
              ? link.icon.replace('line-duotone', 'bold-duotone')
              : link.icon
          "
        />
        <h3>{{ t(link.text) }}</h3>
      </HStack>
    </SafeLink>

    <VStack class="sideStart fullWidth">
      <Navbar2 start-button-only />
    </VStack>
  </VStack>
</template>

<style scoped lang="sass">
  .sideNav
    position: sticky
    top: 1rem
    gap: 0.75rem
    width: 20rem
    padding: var(--contentPadding)
    z-index: 12

    .avatar
      width: 2rem
      height: 2rem
      border-radius: 0.75rem

    .sideNavItem
      padding: 0.75rem
      width: 100%
      justify-content: flex-start
      border-radius: 3rem
      transition: 0.2s ease

      &:hover, &.selected
        background: var(--foregroundColor)
        backdrop-filter: blur(0.5rem)

      svg
        width: 2rem
        height: 2rem

      *
        margin: 0

    .sideStart
      margin-top: 2rem
</style>
