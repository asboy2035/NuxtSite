<script setup lang="ts">
  import Spacer from "@/components/utils/Spacer.vue"
  import Card from "@/components/layout/Card.vue"
  import Grid from "@/components/layout/Grid.vue"
  import IconItem from "~/components/layout/IconItem.vue"
  import CardTitle from "@/components/utils/CardTitle.vue"
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
      <icon-item
        name="Discord"
        link="https://discord.com/users/1118629361675939860"
        icon="ic:baseline-discord"
      />

      <icon-item
        name="Snapchat"
        link="https://snapchat.com/t/BzWqgpTE"
        icon="mingcute:snapchat-fill"
      />

      <icon-item
        name="Reddit"
        link="https://www.reddit.com/user/asboy2035/"
        icon="fa6-brands:reddit-alien"
      />

      <icon-item
        name="BlueSky"
        link="https://asboy2035.bsky.social/"
        icon="ri:bluesky-fill"
      />
    </grid>
  </card>
</template>
