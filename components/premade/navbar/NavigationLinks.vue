<script setup lang="ts">
  import HStack from "@/components/layout/HStack.vue"
  import NavigationButton from "@/components/premade/navbar/NavigationButton.vue"
</script>

<template>
  <h-stack class="tight">
    <navigation-button
      link="/links"
      text="Links"
      icon="solar:link-minimalistic-2-line-duotone"
      aria-label="ash's Links"
    />

    <navigation-button
      link="/apps/"
      text="Apps"
      icon="solar:widget-2-line-duotone"
      aria-label="ash's Apps"
    />

    <navigation-button
      link="/goodies/"
      text="Goodies"
      icon="solar:inbox-line-line-duotone"
      aria-label="Goodies"
    />
  </h-stack>
</template>
