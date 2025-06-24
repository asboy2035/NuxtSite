<script setup lang="ts">
  import Card from "@/components/layout/Card.vue";
  import Grid from "@/components/layout/Grid.vue";
  import LinkItem from "@/components/links/LinkItem.vue";
</script>

<template>
  <card class="spaced">
    <grid class="tight spaced">
      <link-item
        name="Email"
        link="mailto:as_supp@icloud.com"
        icon="solar:plain-bold"
      />

      <link-item
        name="GitHub"
        link="https://github.com/asboy2035"
        icon="mingcute:github-fill"
      />

      <link-item
        name="Instagram"
        link="https://www.instagram.com/asboy2035/"
        icon="ri:instagram-fill"
      />

      <link-item
        name="Ko-Fi"
        link="https://ko-fi.com/asboy2035"
        icon="cib:ko-fi"
      />
    </grid>
  </card>
</template>
