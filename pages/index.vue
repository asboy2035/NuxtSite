<script setup>
import AboutSidebar from '@/components/home/AboutSidebar.vue'
import Navbar from '@/components/premade/navbar/Navbar.vue'
import AboutHeader from "@/components/home/AboutHeader.vue"
import LocationCard from "@/components/home/cards/LocationCard.vue"
import AboutCard from "@/components/home/cards/AboutCard.vue"
import Grid from "@/components/layout/Grid.vue"
import LangsCard from "@/components/home/cards/LangsCard.vue"
import BottomFooter from "@/components/premade/BottomFooter.vue"

useHead({
  title: 'ash (asboy2035) ∙ Portfolio',
  meta: [
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'description', content: 'My (new) site :)' },
    { property: 'og:title', content: "ash's Site" },
    { property: 'og:description', content: 'My (new) site :)' },
    { property: 'og:image', content: '/images/SitePreview.png' }
  ],
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})
</script>

<template>
  <div class="navigationView">
    <about-sidebar />
    <div class="contentView">
      <div class="content spaced">
        <about-header />

        <!--More About-->
        <grid class="spaced">
          <about-card />
          <location-card />
        </grid>

        <langs-card />
        <bottom-footer />
      </div>

      <navbar hide-profile />
    </div>
  </div>
</template>
