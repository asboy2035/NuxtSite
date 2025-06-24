<script setup lang="ts">
  import Spacer from "@/components/utils/Spacer.vue"
  import Card from "@/components/layout/Card.vue"
  import Grid from "@/components/layout/Grid.vue"
  import LinkItem from "@/components/links/LinkItem.vue"
  import CardTitle from "@/components/utils/CardTitle.vue";
</script>

<template>
  <card class="spaced">
    <card-title
      title="My Socials"
      icon="solar:share-line-duotone"
    />

    <p>My socials and contact methods :3</p>
    <spacer />

    <grid class="tight spaced">
      <link-item
        name="Discord"
        link="https://discord.com/users/1118629361675939860"
        icon="ic:baseline-discord"
      />

      <link-item
        name="Snapchat"
        link="https://snapchat.com/t/BzWqgpTE"
        icon="mingcute:snapchat-fill"
      />

      <link-item
        name="Reddit"
        link="https://www.reddit.com/user/asboy2035/"
        icon="fa6-brands:reddit-alien"
      />

      <link-item
        name="BlueSky"
        link="https://asboy2035.bsky.social/"
        icon="ri:bluesky-fill"
      />
    </grid>
  </card>
</template>
