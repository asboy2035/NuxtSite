<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { ref } from 'vue'

  import setHeadMeta from '&/setHeadMeta'
  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import NavigationTitle from '+/layout/NavigationTitle.vue'
  import VStack from '+/layout/VStack.vue'
  import BottomFooter from '+/premade/BottomFooter.vue'
  import LauncherCard from '+/premade/navbar/LauncherCard.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Divider from '+/utils/Divider.vue'
  import Modal from '+/utils/Modal.vue'
  import { apps } from '$/apps'
  import { LauncherCreators } from '$/launchers/LauncherCreators'
  const { t } = useI18n()

  const showingAboutModal = ref(false)

  setHeadMeta({
    page: 'pages.toolbox',
    subtitle: 'meta.subtitles.toolbox',
    icon: '/images/icons/Toolbox.png',
  })

  useHead({
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
    ],
  })
</script>

<template>
  <div class="contentView toolboxView">
    <VStack id="headerLinks">
      <NavigationTitle title="pages.toolbox">
        <button
          @click="showingAboutModal = !showingAboutModal"
          id="showAboutModalButton"
        >
          <icon
            v-if="!showingAboutModal"
            class="growIn"
            icon="solar:info-circle-line-duotone"
          />

          <icon
            v-else-if="showingAboutModal"
            class="spinIn"
            icon="mingcute:close-fill"
          />
        </button>
      </NavigationTitle>

      <Card :index="0">
        <CardTitle title="toolbox.quickLinks" icon="solar:bolt-line-duotone" />

        <HStack>
          <a href="https://g.a35.dev/">
            <button>
              <Icon icon="solar:book-line-duotone" />
              {{ t('sites.guides') }}
            </button>
          </a>

          <a href="https://github.com/main35/NuxtSite">
            <button>
              <Icon icon="mingcute:github-fill" />
              GitHub
            </button>
          </a>
        </HStack>
      </Card>

      <LauncherCard
        title="creators.tools"
        icon="solar:sledgehammer-line-duotone"
        base-url="/toolbox"
        :launcher-items="LauncherCreators"
        :index="1"
      />

      <divider />

      <CardTitle title="pages.apps" icon="solar:widget-2-line-duotone" />
      <AppsCategoryList :index="2" :apps-data="apps" />
    </VStack>

    <BottomFooter :index="3" hide-read-more />

    <Modal v-if="showingAboutModal">
      <img
        src="/images/icons/Toolbox.png"
        alt="Toolbox Icon"
        class="toolboxIcon"
      />

      <h1>{{ t('toolbox.about') }}</h1>
      <h3>{{ t('toolbox.desc1') }}</h3>
      <p>{{ t('toolbox.desc2') }}</p>

      <a href="https://g.a35.dev/misc/web/pwaInstall" target="_blank">
        <button id="howToInstallToolbox">
          <icon icon="solar:download-minimalistic-line-duotone" />
          {{ t('apps.pwaInstall') }}
        </button>
      </a>
    </Modal>
  </div>
</template>

<style scoped lang="sass">
  #headerLinks
    width: 100%
    justify-content: flex-start

  .toolboxView
    padding-bottom: 3rem

  .toolboxIcon
    width: 4rem
    height: auto
    border-radius: 1.5rem !important
</style>
