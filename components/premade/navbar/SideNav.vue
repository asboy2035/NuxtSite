<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type { NavLink } from ':/navLink'
  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import Navbar2 from '+/premade/navbar/Navbar2.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { HomeNavLink, NavLinks } from '$/NavLinks'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  const isHome = computed(() => {
    return route.path === '/' || route.path === localePath('/')
  })

  const HomeItem: NavLink = {
    icon: 'solar:home-angle-line-duotone',
    ...HomeNavLink,
  }

  function isActive(link: NavLink): boolean {
    return link === HomeItem ? isHome.value : route.path.includes(link.link)
  }
</script>

<template>
  <VStack class="sideNav sidebarModeOnly">
    <SafeLink to="/" class="fullWidth">
      <HStack class="sideNavItem">
        <img class="avatar" src="/images/avatar-27.webp" alt="Avatar" />
        <h2>{{ t('name') }}</h2>
      </HStack>
    </SafeLink>

    <SafeLink
      v-for="(link, i) in [HomeItem, ...NavLinks]"
      :to="link.link"
      class="fullWidth"
    >
      <HStack
        class="sideNavItem"
        :class="{ selected: isActive(link) }"
        :style="{ '--index': i }"
      >
        <Icon
          v-if="link.icon"
          :icon="
            isActive(link)
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

      opacity: 0.4
      transform: translateX(-1rem)
      animation: sidebarItemIn 0.3s ease forwards
      animation-delay: calc(var(--index) * 0.1s)

      &:hover, &.selected
        background: var(--foregroundDark)
        backdrop-filter: blur(1rem)

      svg
        width: 2rem
        height: 2rem

      *
        margin: 0

    .sideStart
      margin-top: 2rem

  @keyframes sidebarItemIn
    from
      opacity: 0.4
      transform: translateX(-1rem)

    to
      opacity: 1
      transform: none
</style>
