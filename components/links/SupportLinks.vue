<script setup lang="ts">
  import Card from "@/components/layout/Card.vue";
  import Grid from "@/components/layout/Grid.vue";
  import IconItem from "~/components/layout/IconItem.vue";
</script>

<template>
  <card class="spaced">
    <grid class="tight spaced">
      <icon-item
        name="Email"
        link="mailto:as_supp@icloud.com"
        icon="solar:plain-bold"
      />

      <icon-item
        name="GitHub"
        link="https://github.com/asboy2035"
        icon="mingcute:github-fill"
      />

      <icon-item
        name="Instagram"
        link="https://www.instagram.com/asboy2035/"
        icon="ri:instagram-fill"
      />

      <icon-item
        name="Ko-Fi"
        link="https://ko-fi.com/asboy2035"
        icon="cib:ko-fi"
      />
    </grid>
  </card>
</template>
