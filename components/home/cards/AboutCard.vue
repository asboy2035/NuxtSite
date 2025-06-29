<script setup lang="ts">
  import Card from "@/components/layout/Card.vue"
  import Spacer from "@/components/utils/Spacer.vue"
  import Description from "@/components/premade/Description.vue"
  import VStack from "@/components/layout/VStack.vue"
  import NavButtons from "~/components/home/NavButtons.vue"
</script>

<template>
  <card>
    <v-stack class="edgeToEdge">
      <description />
      <spacer />
      <nav-buttons />
    </v-stack>
  </card>
</template>
