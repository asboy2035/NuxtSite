<script setup lang="ts">
  import Navbar from "~/components/premade/navbar/Navbar.vue"
  import Hero from "~/components/utils/Hero.vue"
  import CreatorsCard from "~/components/creator/CreatorsCard.vue";

  useHead({
    title: "ash - Creators",
    meta: [
      { name: "description", content: "My tools and creators." },
      { property: "og:title", content: "ash - Creators" },
      { property: "og:description", content: "My tools and creators." },
      { property: "og:image", content: "/images/Creator.jpg"}
    ]
  })
</script>

<template>
  <div class="contentView">
    <hero image="/images/Creator.jpg">
      <h1>Create...</h1>
      <h2>Choose a tool.</h2>
    </hero>

    <creators-card />

    <footer />

    <navbar />
  </div>
</template>
