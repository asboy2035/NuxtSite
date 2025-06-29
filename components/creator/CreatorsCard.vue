<script setup lang="ts">
  import CardTitle from "~/components/utils/CardTitle.vue"
  import Card from "~/components/layout/Card.vue"
  import HStack from "~/components/layout/HStack.vue"
</script>

<template>
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
</template>
