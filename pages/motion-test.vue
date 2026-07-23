<script setup lang="ts"></script>

<template>
  <div class="contentView">
    <Motion
      as="button"
      class="testButton"
      :whileHover="{
        scale: 1.2,
        transition: { duration: 0.4 },
      }"
      :whilePress="{ scale: 0.9 }"
    >
      Click
    </Motion>
  </div>
</template>

<style scoped lang="sass">
  .testButton, .testButton:hover
    transition: none !important
</style>
