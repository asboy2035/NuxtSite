<script setup lang="ts">

import { Icon } from "@iconify/vue";

import Card from "+/layout/Card.vue";
import HStack from "+/layout/HStack.vue";
import VStack from "+/layout/VStack.vue";
import NavigationButton from "+/premade/navbar/NavigationButton.vue";
import NavigationLinks from "+/premade/navbar/NavigationLinks.vue";
import CardTitle from "+/utils/CardTitle.vue";
import DynamicImage from "+/utils/DynamicImage.vue";
import {HomeNavLink, useCurrentNavLink} from "$/NavLinks";

const currentNavLink = useCurrentNavLink()
const { t } = useI18n()

const open: Ref<boolean> = ref(false)
const animating: Ref<boolean> = ref(false)
</script>

<template>
  <div
    class="navbar2Container"
  >
    <Motion
      as="div"
      class="navbar2Wrapper"
      layout
      :transition="{
        layout: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      }"
      :class="{ open }"
      @layout-animation-start="animating = true"
      @layout-animation-complete="animating = false"
    >
      <Card class="navbar2" :class="{ open }">
        <VStack class="contents" :class="{ animating }">
          <VStack class="fullWidth opened" v-if="open">
            <CardTitle title="NavbarV2" icon="solar:widget-4-line-duotone">
              <button @click="open = !open">
                <Icon icon="mingcute:close-fill" />
              </button>
            </CardTitle>

            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>
            <h1>big boi</h1>

            <NavigationLinks @click="open = false" />
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

              <HStack class="currentNavLink" v-if="currentNavLink">
                <Icon v-if="currentNavLink.icon" :icon="currentNavLink.icon" />
                {{ t(currentNavLink.text) }}
              </HStack>

              <Icon icon="solar:alt-arrow-up-linear" />
            </HStack>
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

    .navbar2Wrapper
      width: fit-content
      margin: auto

      &.open
        width: 100%
        height: calc(100dvh - 1rem)

      .navbar2
        width: 100%
        height: 100%

        &:not(.open)
          padding: 0.5rem

        .contents
          width: 100%
          height: 100%
          transition: filter .15s ease

          &.animating
            filter: blur(8px)

          .opener
            cursor: pointer

            .name
              margin: 0

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
