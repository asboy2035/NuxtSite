<script setup lang="ts">
  import HStack from "~/components/layout/HStack.vue"
  import Navbar from "~/components/premade/navbar/Navbar.vue"
  import Card from "~/components/layout/Card.vue"
  import Hero from "~/components/utils/Hero.vue"
  import CardTitle from "~/components/utils/CardTitle.vue"
</script>

<template>
  <div class="contentView">
    <hero image="/images/Creator.jpg">
      <h1>Create...</h1>
      <h2>Choose a tool.</h2>
    </hero>

    <card>
      <card-title
        title="Tools"
        icon="solar:sledgehammer-line-duotone"
      />

      <h-stack>
        <a href="creator/char-card"><button>
          <img src="/images/icons/CharCard-Icon.jpg" alt="CharCard Icon">
          Character Card
        </button></a>

        <a href="creator/csv-to-json"><button>
          <img src="/images/icons/CSV-Icon.jpg" alt="CSV Icon">
          CSV to JSON
        </button></a>
      </h-stack>
    </card>

    <footer />

    <navbar />
  </div>
</template>
