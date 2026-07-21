<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { ref } from 'vue'
  import { ProgressiveBlur } from 'vue-progressive-blur'

  import HStack from '+/layout/HStack.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import VStack from '+/layout/VStack.vue'
  import FullscreenCover from '+/premade/FullscreenCover.vue'
  import LauncherCard from '+/premade/navbar/LauncherCard.vue'
  import NavigationButton from '+/premade/navbar/NavigationButton.vue'
  import NavigationLinks from '+/premade/navbar/NavigationLinks.vue'
  import SitePicker from '+/premade/navbar/SitePicker.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import { LauncherApps } from '$/launchers/LauncherApps'
  import { LauncherCreators } from '$/launchers/LauncherCreators'
  import { HomeNavLink } from '$/NavLinks'

  const { t } = useI18n()
  const route = useRoute()

  const showingNavProfile = computed(() => route.meta.showingNavProfile ?? true)
  const showLaunchers: Ref<boolean> = ref(false)
  const showMobileNav: Ref<boolean> = ref(false)
  const showSiteSwitcher: Ref<boolean> = ref(false)
  const navRef: Ref<HTMLElement | null> = ref(null)
  const expandedNavbar: Ref<boolean> = ref(false)

  function toggleNavigation() {
    showMobileNav.value = !showMobileNav.value

    if (!showMobileNav.value) {
      expandedNavbar.value = false
    }
  }

  function toggleSiteSwitcher() {
    showSiteSwitcher.value = !showSiteSwitcher.value
  }

  function hideMobileNav() {
    showMobileNav.value = false
    expandedNavbar.value = false
  }

  onMounted(() => {
    watch(
      () => route.meta.showingNavProfile,
      async () => {
        const component = navRef.value
        // @ts-ignore
        if (!component?.$el) return
        // @ts-ignore
        const el = component.$el

        const currentWidth = el.getBoundingClientRect().width
        el.style.width = currentWidth + 'px'
        el.style.overflow = 'hidden'

        await nextTick()

        const tempWidth = el.style.width
        el.style.width = 'auto'
        void el.offsetWidth

        const targetWidth = el.getBoundingClientRect().width

        el.style.width = tempWidth
        void el.offsetWidth

        requestAnimationFrame(() => {
          el.style.transition = 'width 0.2s ease'
          el.style.width = targetWidth + 'px'
        })

        setTimeout(() => {
          el.style.transition = ''
          el.style.width = ''
          el.style.overflow = 'visible'
        }, 220)
      },
      { flush: 'sync' }
    )
  })
</script>

<template>
  <VStack class="navBarContainer">
    <!-- Insert toolbar items here -->
    <slot />

    <!-- Launchers -->
    <FullscreenCover id="navLaunchers" v-if="showLaunchers">
      <VStack>
        <LauncherCard
          title="navbar.launchers.apps"
          icon="solar:widget-2-line-duotone"
          base-url="/apps"
          :launcher-items="LauncherApps"
          :index="0"
        />

        <LauncherCard
          title="navbar.launchers.creators"
          icon="solar:pen-new-square-line-duotone"
          base-url="/creator"
          :launcher-items="LauncherCreators"
          :index="1"
        />
      </VStack>
    </FullscreenCover>

    <!-- Nav on Mobile -->
    <InteriorItem
      id="mobileNav"
      :class="{ hidden: !showMobileNav }"
      class="navBar"
    >
      <NavigationLinks @click="hideMobileNav()" :expanded="expandedNavbar" />

      <button class="transparent" @click="expandedNavbar = !expandedNavbar">
        <Icon
          :icon="
            expandedNavbar
              ? 'solar:alt-arrow-up-line-duotone'
              : 'solar:alt-arrow-down-line-duotone'
          "
        />
      </button>
    </InteriorItem>

    <!-- Site Switcher -->
    <SitePicker id="siteSwitcher" v-if="showSiteSwitcher && !expandedNavbar">
      <button @click="toggleSiteSwitcher()">
        <Icon icon="mingcute:close-fill" />
      </button>
    </SitePicker>

    <ProgressiveBlur
      class="siteSwitchBlur"
      v-if="showSiteSwitcher"
      :blur="28"
      :border-radius="0"
    />

    <!-- Main Nav Sections -->
    <HStack class="navBarRow">
      <button
        v-if="!expandedNavbar"
        @click="showLaunchers = !showLaunchers"
        class="createBtn"
        id="openLauncher"
        aria-label="Launch app or create..."
      >
        <Icon
          icon="solar:bolt-line-duotone"
          class="growIn"
          v-if="!showLaunchers"
        />
        <Icon icon="mingcute:close-fill" class="spinIn" v-else />
      </button>

      <!-- Main Nav -->
      <HStack
        ref="navRef"
        class="navBar"
        :class="{ desktopLinks: !showingNavProfile, expanded: expandedNavbar }"
      >
        <HStack class="navBarInner" v-if="showingNavProfile && !expandedNavbar">
          <HStack class="profile transparent">
            <NavigationButton :link="HomeNavLink" id="homeButtonContainer">
              <DynamicImage
                class="avatar"
                src="/images/avatar-27.webp"
                alt="ash's Avatar (Go Home)"
                id="avatarButton"
              />

              <Icon
                icon="solar:home-angle-bold-duotone"
                aria-label="Go Home"
                id="homeButton"
              />
            </NavigationButton>

            <HStack class="navBarInnerName">
              <h1 class="name">ash</h1>

              <HStack
                id="siteSwitcherButton"
                class="light tight"
                :class="{ active: showSiteSwitcher }"
                @click="toggleSiteSwitcher"
              >
                <h1>Port</h1>
                <Icon icon="fa6-solid:chevron-down" />
              </HStack>
            </HStack>
          </HStack>
        </HStack>

        <NavigationLinks
          class="desktopLinks"
          :expanded="expandedNavbar"
          @click="expandedNavbar = false"
        />

        <button
          class="transparent toggleButton"
          @click="expandedNavbar = !expandedNavbar"
        >
          <Icon
            :icon="
              expandedNavbar
                ? 'solar:alt-arrow-up-line-duotone'
                : 'solar:alt-arrow-down-line-duotone'
            "
          />
          <span class="toggleButtonText">{{ t('navbar.hide') }}</span>
        </button>
      </HStack>

      <SafeLink to="/" v-if="!showingNavProfile">
        <InteriorItem class="minimalProfile"> ash </InteriorItem>
      </SafeLink>

      <button
        id="mobileButton"
        @click="toggleNavigation"
        aria-label="Show navigation"
      >
        <Icon
          icon="solar:compass-line-duotone"
          class="growIn"
          v-if="!showMobileNav"
        />
        <Icon icon="mingcute:close-fill" class="spinIn" v-if="showMobileNav" />
      </button>
    </HStack>
  </VStack>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .navBarContainer
    position: sticky
    flex-wrap: wrap
    bottom: 1rem
    width: 100%
    max-width: calc(100vw - 2rem)
    z-index: 18
    align-items: center
    margin-top: auto

    .navBarRow
      z-index: 19
      transition: 0.3s ease

      .minimalProfile
        display: none

  .navBar
    --interiorRadius: 2rem !important
    z-index: 20
    gap: 0.75rem

    .navBarSection
      padding: 0.75rem
      flex-direction: row

    *
      flex-wrap: nowrap !important

    .toggleButtonText
      display: none

    &.expanded
      flex-direction: column !important
      align-items: flex-start
      gap: 1rem

      .toggleButtonText
        display: block

    .profile h1
      overflow-wrap: normal
      word-break: keep-all
      margin: 0

  .avatar
    width: 2.5rem
    height: 2.5rem
    border-radius: 2rem

  .createBtn
    z-index: 20

  #avatarButton
    display: block

  #homeButton
    scale: 1.25
    display: none

  #homeButtonContainer:hover #avatarButton
    display: none

  #homeButtonContainer:hover #homeButton
    display: flex

  #homeButton, #avatarButton
    animation: blurIn 0.3s ease forwards

  #mobileButton, #mobileNav
    display: none

  #mobileNav, #siteSwitcher
    animation: slideBottom 0.3s ease forwards

  @keyframes slideBottom
    0%
      transform: translateY(100vh)

    100%
      transform: none

  #siteSwitcherButton
    cursor: pointer

    svg
      transition: transform 0.2s ease
      width: 1.5rem
      height: auto

    &.active > svg
      transform: rotate(-90deg)

  #siteSwitcher
    z-index: 20

  .siteSwitchBlur
    --siteSwitchBlurHeight: 42rem

    position: fixed !important
    right: 0
    left: 0
    transform: translateY(calc(100vh - var(--siteSwitchBlurHeight)))
    height: var(--siteSwitchBlurHeight)
    z-index: 19

  #mobileButton, .createBtn
    svg
      width: 1.25rem
      height: 1.25rem

  // Mobile Behaviors
  @media (max-width: 40rem)
    .navBarRow
      width: 100%
      justify-content: space-between

      .toggleButton
        display: none !important

      .minimalProfile
        display: block !important
        padding: 0.5rem 1rem

    // Conditions
    #mobileButton, #mobileNav
      display: flex

    .desktopLinks, .name
      display: none
</style>
