<script setup lang="ts">
  import { ref } from 'vue'
  import HStack from '@/components/layout/HStack.vue'
  import VStack from '@/components/layout/VStack.vue'
  import Card from '@/components/layout/Card.vue'
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import FullscreenCover from "@/components/premade/FullscreenCover.vue"
  import DynamicImage from "@/components/utils/DynamicImage.vue"
  import NavigationLinks from "@/components/premade/navbar/NavigationLinks.vue"
  import NavigationButton from "@/components/premade/navbar/NavigationButton.vue"
  import SitePicker from "@/components/premade/navbar/SitePicker.vue"
  import { Icon } from '@iconify/vue'
  import {ProgressiveBlur} from "vue-progressive-blur"
  import CardTitle from "@/components/utils/CardTitle.vue"

  const showSwitcher = ref(false)

  defineProps<{
    hideProfile?: boolean
  }>()

  interface Item {
    name: string,
    link: string,
    icon: string
  }

  const apps: Item[] = [
    {
      name: 'tewFA',
      link: 'https://tfa.asboy2035.com',
      icon: 'https://tfa.asboy2035.com/assets/icon-1024.png'
    },
    {
      name: "Astro",
      link: "https://ashtronomy.pages.dev/",
      icon: "https://ashtronomy.pages.dev/images/Astronomy-Icon.png",
    },
    {
      name: "Clocs",
      link: "https://clocs.pages.dev/",
      icon: "https://clocs.pages.dev/Icons/Icon.png",
    },
    {
      name: "Vault",
      link: "/vault/",
      icon: "https://byteforge-site-3-3.byteforge.pages.dev/images/Vault-Icon.jpeg",
    },
  ]

  const creators: Item[] = [
    {
      name: "Character Card",
      link: "/creator/char-card",
      icon: "/images/icons/CharCard-Icon.jpg",
    },
    {
      name: "CSV to JSON",
      link: "/creator/csv-to-json",
      icon: "/images/icons/CSV-Icon.jpg",
    }
  ]

  const showMobileNav = ref(false)

  function toggleNavigation() {
    showMobileNav.value = !showMobileNav.value
  }

  const showSiteSwitcher = ref(false)

  function toggleSiteSwitcher() {
    showSiteSwitcher.value = !showSiteSwitcher.value
}
</script>

<template>
  <v-stack class="navBar">
    <slot />

    <fullscreen-cover v-if="showSwitcher">
      <v-stack>
        <card class="quickContainer">
          <card-title
            title="Apps"
            icon="solar:widget-2-line-duotone"
          />

          <h-stack class="tight">
            <interior-item v-for="app in apps" :key="app.name">
              <a :href="app.link" target="_blank">
                <dynamic-image
                  class="launcherImage"
                  :src="app.icon"
                  :alt="app.name + ' icon'"
                  radius="0.35rem"
                />
                <p>{{ app.name }}</p>
              </a>
            </interior-item>
          </h-stack>
        </card>

        <card class="quickContainer">
          <card-title
            title="Create..."
            icon="solar:pen-new-square-line-duotone"
          />

          <h-stack class="tight">
            <interior-item v-for="creator in creators" :key="creator.name">
              <a :href="creator.link">
                <dynamic-image
                  class="launcherImage"
                  :src="creator.icon"
                  :alt="creator.name + ' icon'"
                  radius="0.35rem"
                />
                <p>{{ creator.name }}</p>
              </a>
            </interior-item>
          </h-stack>
        </card>
      </v-stack>
    </fullscreen-cover>

    <header id="mobileNav" :class="{ hidden: !showMobileNav }">
      <navigation-links />
    </header>

    <site-picker
      id="siteSwitcher"
      :class="{ hidden: !showSiteSwitcher }"
    >
      <button @click="toggleSiteSwitcher()" style="--buttonRadius: 2rem">
        <Icon icon="mingcute:close-fill" width="24" height="24" />
      </button>
    </site-picker>
    <progressive-blur
      class="siteSwitchBlur"
      :blur="64"
      :border-radius="0"
      :class="{ hidden: !showSiteSwitcher }"
    />
    <h-stack>
      <button @click="showSwitcher = !showSwitcher" class="createBtn">
        <Icon
          icon="heroicons:sparkles-20-solid"
          class="growIn" v-if="!showSwitcher"
          width="20" height="20"
        />
        <Icon
          icon="mingcute:close-fill"
          class="spinIn" v-if="showSwitcher"
          width="20" height="20"
        />
      </button>

      <header :class="{ desktopLinks: hideProfile }">
        <h-stack v-if="hideProfile !== true" class="profile transparent">
          <navigation-button link="/" id="homeButtonContainer" text="Home">
            <dynamic-image
              class="avatar"
              src="/images/avatar.png"
              alt="ash's Avatar (Go Home)"
              id="avatarButton"
            />

            <Icon
              icon="solar:home-angle-bold-duotone"
              aria-label="Go Home" id="homeButton"
              style="scale: 1.25" width="24" height="24"
            />
          </navigation-button>

          <h-stack style="margin-right: 0.75rem">
            <h1 class="name">ash</h1>

            <h-stack
              id="siteSwitcherButton"
              class="light tight"
              :class="{ active: showSiteSwitcher }"
              @click="toggleSiteSwitcher"
            >
              <h1>Port</h1>
              <Icon icon="fa6-solid:chevron-down" width="24" height="24" />
            </h-stack>
          </h-stack>
        </h-stack>

        <navigation-links class="desktopLinks" />
      </header>

      <button id="mobileButton" @click="toggleNavigation">
        <Icon
          icon="solar:compass-bold"
          class="growIn" v-if="!showMobileNav"
          width="20" height="20"
        />
        <Icon
          icon="mingcute:close-fill"
          class="spinIn" v-if="showMobileNav"
          width="20" height="20"
        />
      </button>
    </h-stack>
  </v-stack>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .navBar
    position: sticky
    flex-wrap: wrap
    bottom: 1rem
    max-width: calc(100vw - 2rem)
    z-index: 19
    align-items: center

  header
    display: flex
    justify-content: space-between
    align-items: center
    gap: 0.75rem
    background: colors.$foregroundColor
    box-shadow: 0.5rem 0.5rem 3rem rgba(28, 28, 28, 0.2)
    padding: 0.5rem
    border-radius: 1.75rem
    z-index: 20
    backdrop-filter: blur(2rem)
    transition: width 0.2s ease

  header::after
    content: ""
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0

    border: 0.1rem solid colors.$textColor
    opacity: 0.1
    z-index: 21
    border-radius: 1.75rem
    pointer-events: none

  .profile h1
    margin: 0

  .avatar
    width: 3rem
    height: 3rem
    border-radius: 1.25rem

  .createBtn
    --buttonRadius: 2rem
    height: fit-content
    z-index: 20

  .createBtn::before
    content: ""
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    padding: 0.5rem

    border-radius: 50%
    background: colors.$accentColor
    z-index: -1
    filter: blur(1rem)
    transition: opacity 0.4s ease

  #avatarButton
    display: block

  #homeButton
    display: none

  #homeButtonContainer:hover #avatarButton
    display: none

  #homeButtonContainer:hover #homeButton
    display: flex

  #homeButton, #avatarButton
    animation: blurIn 0.3s ease forwards

  .launcherImage
    width: 2rem
    height: 2rem

  #mobileButton
    display: none

  #mobileNav, #siteSwitcher
    animation: slideBottom 0.3s ease forwards

  @keyframes slideBottom
    0%
      transform: translateY(100vh)

    100%
      transform: none

  @media (max-width: 35rem)
    #mobileButton
      --buttonRadius: 2rem
      display: flex

    .desktopLinks
      display: none

    .name
      display: none

  #siteSwitcherButton
    cursor: pointer

  #siteSwitcherButton > svg
    transition: transform 0.2s ease

  #siteSwitcherButton.active > svg
    transform: rotate(-90deg)

  #siteSwitcher
    z-index: 20

  .siteSwitchBlur
    --siteSwitchBlurHeight: 32rem

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
</style>
