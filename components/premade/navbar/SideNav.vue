<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type { NavLink } from ':/navLink'
  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import Clock from '+/premade/Clock.vue'
  import Navbar from '+/premade/navbar/Navbar.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { HomeNavLink, NavLinks, RingNavLink } from '$/NavLinks'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  const isHome = computed(() => {
    return route.path === '/' || route.path === localePath('/')
  })

  function isActive(link: NavLink): boolean {
    return link === HomeNavLink ? isHome.value : route.path.includes(link.link)
  }
</script>

<template>
  <VStack class="sideNav sidebarModeOnly">
    <SafeLink to="/" class="fullWidth">
      <HStack class="sideNavItem profileNavItem">
        <img class="avatar" src="/images/avatar-27.webp" alt="Avatar" />

        <HStack class="nameAndClock">
          <h2>{{ t('name') }}</h2>
          <Clock />
        </HStack>
      </HStack>
    </SafeLink>

    <SafeLink
      v-for="(link, i) in [HomeNavLink, ...NavLinks, RingNavLink]"
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
      <Navbar start-button-only />
    </VStack>
  </VStack>
</template>

<style scoped lang="sass">
  .sideNav
    position: sticky
    top: 1rem
    gap: 0.75rem
    width: 20rem
    min-height: fit-content
    flex-wrap: nowrap
    height: calc(100dvh - var(--contentPadding) * 2)
    padding: var(--contentPadding)
    z-index: 12

    .profileNavItem
      .avatar
        width: 2rem
        height: 2rem
        border-radius: 0.75rem

      .nameAndClock
        flex-grow: 1
        justify-content: space-between

    .sideNavItem
      padding: 0.75rem
      width: 100%
      justify-content: flex-start
      border-radius: 3rem
      transition: 0.2s ease

      border: 0.1rem solid transparent
      opacity: 0.4
      transform: translateX(-1rem)
      animation: sidebarItemIn 0.3s ease forwards
      animation-delay: calc(var(--index) * 0.1s)

      &:hover, &.selected
        background: var(--foregroundColor)
        backdrop-filter: blur(0.5rem)
        box-shadow: inset 0 0.15rem 0.12rem 0 var(--foregroundDark)
        border-color: var(--foregroundColor)

      &:active
        scale: 0.95

      svg
        width: 2rem
        height: 2rem

      *
        margin: 0

    .sideStart
      margin-top: auto

  @keyframes sidebarItemIn
    from
      opacity: 0.4
      transform: translateX(-1rem)

    to
      opacity: 1
      transform: none
</style>
