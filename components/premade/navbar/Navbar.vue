<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type { NavLink } from ':/navLink'
  import LangPickerCard from '+/langs/LangPickerCard.vue'
  import Card from '+/layout/Card.vue'
  import Grid from '+/layout/Grid.vue'
  import HStack from '+/layout/HStack.vue'
  import InteriorItem from '+/layout/InteriorItem.vue'
  import VStack from '+/layout/VStack.vue'
  import SitePicker from '+/premade/navbar/SitePicker.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import DynamicImage from '+/utils/DynamicImage.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  import Spacer from '+/utils/Spacer.vue'
  import { NavLinks } from '$/NavLinks'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()

  defineProps<{
    startButtonOnly?: boolean
  }>()

  const showingNavProfile = computed(() => route.meta.showingNavProfile ?? true)
  const open: Ref<boolean> = ref(false)
  const animating: Ref<boolean> = ref(false)
  const hoveredLink = ref<string | null>(null)

  const visibleLabel = (link: NavLink) => {
    const path = localePath(link.link)

    if (hoveredLink.value) {
      return hoveredLink.value === path
    }

    return route.path === path
  }

  function isActive(link: NavLink): boolean {
    return route.path === localePath(link.link)
  }
</script>

<template>
  <div
    class="navbar2Container"
    :class="{ open, stackModeOnly: !startButtonOnly, startButtonOnly }"
  >
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
      <VStack class="navbar2" :class="{ open }">
        <VStack class="contents" :class="{ animating: animating && !open }">
          <VStack class="fullWidth opened" v-if="open">
            <CardTitle title="navbar.go" icon="solar:documents-line-duotone">
              <button @click="open = !open">
                <Icon icon="mingcute:close-fill" />
              </button>
            </CardTitle>

            <SitePicker :index="3" />
            <Spacer />

            <h1>{{ t('pages.languages') }}</h1>

            <Grid class="spaced langsGrid" style="margin-bottom: 0.75rem">
              <LangPickerCard @set="open = false" :index="5" />

              <Card :index="6" class="langNotice autoSpace">
                <VStack class="text noSpace">
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
                </VStack>

                <img
                  aria-hidden="true"
                  alt=""
                  class="langsGraphic"
                  src="/graphics/MikuLangs.webp"
                />
              </Card>
            </Grid>
          </VStack>

          <!-- Small View-->
          <HStack v-if="!open && !startButtonOnly" class="smallNav fullWidth">
            <SafeLink to="/">
              <button id="homeButtonContainer">
                <DynamicImage
                  src="/images/avatar-27.webp"
                  alt="ash's Avatar (Go Home)"
                  id="avatarButton"
                />

                <Icon
                  icon="solar:home-angle-bold-duotone"
                  aria-label="Go Home"
                  id="homeButton"
                />
              </button>
            </SafeLink>

            <HStack class="opener small" @click="open = !open">
              <h3 class="name" v-if="showingNavProfile">{{ t('name') }}</h3>
              <Icon icon="solar:alt-arrow-up-linear" />
            </HStack>

            <HStack class="navigationLinks">
              <InteriorItem class="navigationLinksBox">
                <SafeLink
                  v-for="link in NavLinks"
                  :key="link.link"
                  :to="link.link"
                  @mouseenter="hoveredLink = localePath(link.link)"
                  @mouseleave="hoveredLink = null"
                  class="navigationLinkLink"
                >
                  <button class="transparent navigationLink">
                    <Icon
                      :icon="
                        isActive(link)
                          ? link.icon.replace('line-duotone', 'bold-duotone')
                          : link.icon
                      "
                    />

                    <Motion
                      as="span"
                      class="navigationLinkText"
                      :initial="false"
                      :animate="
                        visibleLabel(link)
                          ? {
                              opacity: 1,
                              width: 'auto',
                              x: 0,
                              marginLeft: '0.5rem',
                            }
                          : {
                              opacity: 0,
                              width: 0,
                              x: -8,
                              marginLeft: 0,
                            }
                      "
                      :transition="{
                        type: 'spring',
                        stiffness: 450,
                        damping: 35,
                      }"
                    >
                      {{ t(link.text) }}
                    </Motion>
                  </button>
                </SafeLink>
              </InteriorItem>
            </HStack>
          </HStack>

          <Card
            v-else-if="!open && startButtonOnly"
            class="startButtonContainer"
          >
            <HStack class="opener startButton" @click="open = !open">
              <Icon icon="solar:widget-5-line-duotone" />
              <h3>{{ t('app.menu') }}</h3>
            </HStack>
          </Card>
        </VStack>
      </VStack>
    </Motion>
  </div>
</template>

<style scoped lang="sass">
  .navbar2Container
    position: sticky
    bottom: 0
    z-index: 18
    width: 100%
    height: fit-content
    padding: 0 0.5rem
    transform-origin: bottom center

    &.open
      padding: 0

      &.startButtonOnly
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0

    &.startButtonOnly
      padding: 0

      .navbar2Wrapper
        width: 100% !important

    .navbar2Wrapper
      width: 100%

      &.open
        height: 100dvh

      .navbar2
        padding: var(--contentPadding)
        width: 100%
        height: 100%
        transition: 0.3s ease
        align-items: center

        &:not(.open)
          padding: 0

        &.open
          background: var(--backgroundColor)
          border-radius: 0

          &::before, &::after
            display: none

        .contents
          width: 100%
          height: 100%
          overflow-y: scroll
          transition: filter .15s ease
          max-width: 60rem

          &.animating
            filter: blur(8px)

          .opener
            cursor: pointer

            svg
              width: 1.5rem
              height: 1.5rem

            .name
              margin: 0

          .startButtonContainer
            padding: 1rem
            cursor: pointer

            .startButton
              width: 100%

              svg
                width: 1.5rem
                height: 1.5rem

              *
                margin: 0

          .opened
            align-items: center

          .langsGrid
            .langsGraphic
              margin-top: -3rem
              opacity: 0.9

          .smallNav
            width: 100%
            align-items: stretch
            gap: 0.25rem

            .opener.small
              gap: 0.25rem

            .navigationLinks
              flex-grow: 1
              justify-content: flex-end
              gap: 1rem
              padding: 0.5rem 0

              .navigationLinksBox
                flex-direction: row
                gap: 1rem
                padding: 0 1rem
                height: 100%

                &::before
                  display: none

              .navigationLinkLink
                margin: 0.5rem 0

              .navigationLinkLink, .navigationLink
                height: 100%

              .navigationLink
                gap: 0

                .navigationLinkText
                  font-size: 1.25rem
                  display: inline-block
                  overflow: hidden
                  white-space: nowrap

                svg
                  width: 1.75rem !important
                  height: 1.75rem !important

            #homeButtonContainer
              width: 2.75rem
              height: 2.75rem
              transition: 0.2s ease-in-out
              padding: 0
              margin: 0.75rem 0

              svg
                height: 1.25rem
                width: 1.25rem

              #avatarButton
                width: 2.5rem
                height: 2.5rem
                border-radius: 2rem

              &:not(:hover) #homeButton
                display: none
              &:hover #avatarButton
                display: none

              #homeButton, #avatarButton
                animation: blurIn 0.3s ease forwards

  @media (max-width: 25rem)
    .navigationLinkText
      display: none !important
</style>
