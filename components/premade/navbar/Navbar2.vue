<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import LangPickerCard from '+/langs/LangPickerCard.vue'
  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import HStack from '+/layout/HStack.vue'
  import VStack from '+/layout/VStack.vue'
  import LauncherCard from '+/premade/navbar/LauncherCard.vue'
  import NavigationButton from '+/premade/navbar/NavigationButton.vue'
  import NavigationLinks from '+/premade/navbar/NavigationLinks.vue'
  import SitePicker from '+/premade/navbar/SitePicker.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { LauncherApps } from '$/launchers/LauncherApps'
  import { LauncherCreators } from '$/launchers/LauncherCreators'
  import { HomeNavLink } from '$/NavLinks'

  const { t } = useI18n()

  const open: Ref<boolean> = ref(false)
  const animating: Ref<boolean> = ref(false)
</script>

<template>
  <div class="navbar2Container" :class="{ open }">
    <Motion
      as="div"
      class="navbar2Wrapper"
      layout
      :transition="{
        layout: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
      }"
      :class="{ open }"
      @layout-animation-start="animating = true"
      @layout-animation-complete="animating = false"
    >
      <Card class="navbar2" :class="{ open }">
        <VStack class="contents" :class="{ animating: animating && !open }">
          <VStack class="fullWidth opened" v-if="open">
            <CardTitle title="NavbarV2" icon="solar:widget-4-line-duotone">
              <button @click="open = !open">
                <Icon icon="mingcute:close-fill" />
              </button>
            </CardTitle>

            <Card :index="0" class="navLinksContainer">
              <HStack class="fullWidth autoSpace">
                <h3>Go...</h3>
                <NavigationLinks @click="open = false" />
              </HStack>
            </Card>

            <Spacer />

            <Grid class="spaced">
              <VStack>
                <LauncherCard
                  title="navbar.launchers.apps"
                  icon="solar:widget-2-line-duotone"
                  base-url="/apps"
                  :launcher-items="LauncherApps"
                  :index="1"
                />

                <LauncherCard
                  title="navbar.launchers.creators"
                  icon="solar:pen-new-square-line-duotone"
                  base-url="/creator"
                  :launcher-items="LauncherCreators"
                  :index="2"
                />
              </VStack>

              <SitePicker :index="3" />
            </Grid>

            <Spacer />

            <h1>{{ t('pages.languages') }}</h1>

            <Grid class="spaced">
              <LangPickerCard :index="5" />

              <Card :index="6">
                <CardTitle
                  title="languages.betaNotice"
                  icon="solar:danger-triangle-line-duotone"
                />
                <p>{{ t('languages.errorNotice') }}</p>
                <p>
                  {{ t('languages.foundError') }}
                  <a
                    class="prominentLink"
                    href="https://github.com/main35/NuxtSite/issues"
                    >{{ t('languages.reportError') }}</a
                  >
                </p>
              </Card>
            </Grid>
          </VStack>

          <!-- Small View-->
          <HStack v-if="!open">
            <NavigationButton :link="HomeNavLink" id="homeButtonContainer">
              <DynamicImage
                class="avatar"
                src="/images/avatar-26.webp"
                alt="ash's Avatar (Go Home)"
                id="avatarButton"
              />

              <Icon
                icon="solar:home-angle-bold-duotone"
                aria-label="Go Home"
                id="homeButton"
              />
            </NavigationButton>

            <HStack class="opener" @click="open = !open">
              <h1 class="name">ash</h1>
              <Icon icon="solar:alt-arrow-up-linear" />
            </HStack>

            <NavigationLinks />
          </HStack>
        </VStack>
      </Card>
    </Motion>
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .navbar2Container
    position: sticky
    bottom: 0
    z-index: 18
    width: 100%
    height: fit-content
    padding: 0.5rem
    transform-origin: bottom center

    &.open
      padding: 0

    .navbar2Wrapper
      width: fit-content
      margin: auto

      &.open
        width: 100%
        height: 100dvh

      .navbar2
        width: 100%
        height: 100%
        transition: 0.3s ease
        align-items: center

        &:not(.open)
          padding: 0.5rem

        &.open
          background: colors.$backgroundColor
          border-radius: 0

          &::before, &::after
            display: none

        .contents
          width: 100%
          height: 100%
          overflow-y: scroll
          transition: filter .15s ease
          max-width: 65rem

          &.animating
            filter: blur(8px)

          .opener
            cursor: pointer

            .name
              margin: 0

          .opened
            align-items: center

            .navLinksContainer
              padding: 0.5rem
              max-width: 45rem

              h3
                margin: 0
                margin-inline-start: 1rem

          .avatar
            width: 2.5rem
            height: 2.5rem
            border-radius: 2rem

          #homeButtonContainer
            #avatarButton
              display: block
            #homeButton
              display: none

            &:hover
              #avatarButton
                display: none
              #homeButton
                display: flex

            #homeButton, #avatarButton
              animation: blurIn 0.3s ease forwards
</style>
