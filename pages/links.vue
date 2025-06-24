<script setup lang="ts">
  import Navbar from "@/components/premade/navbar/Navbar.vue"
  import Grid from "@/components/layout/Grid.vue"
  import Card from "@/components/layout/Card.vue"
  import Spacer from "@/components/utils/Spacer.vue"
  import BottomFooter from "@/components/premade/BottomFooter.vue"
  import MoreLinks from "@/components/links/MoreLinks.vue"
  import SocialLinks from "@/components/links/SocialLinks.vue"
  import Description from "@/components/premade/Description.vue"
  import VStack from "@/components/layout/VStack.vue"
  import { Icon } from "@iconify/vue"
  import SupportLinks from "@/components/links/SupportLinks.vue"
  import Hero from "@/components/utils/Hero.vue"

  useHead({
    title: "ash's Links",
    meta: [
      { name: "description", content: "My socials, contacts, and more :)" },
      { property: "og:title", content: "ash's Links" },
      { property: "og:description", content: "My socials, contacts, and more :)" },
      { property: "og:image", content: "/images/Links.jpg" }
    ]
  })
</script>

<template>
  <div class="contentView">
    <hero image="/images/Links.jpg">
      <h1>Links</h1>
      <h2>My socials, contacts, and more.</h2>
    </hero>

    <!-- About -->
    <grid class="spaced">
      <card class="autoSpace">
        <v-stack class="edgeToEdge">
          <description />
          <spacer />
        </v-stack>

        <Icon icon="solar:heart-bold-duotone" width="24" height="24" />
      </card>
    </grid>

    <social-links />
    <support-links />
    <more-links />
    <bottom-footer />

    <navbar />
  </div>
</template>
