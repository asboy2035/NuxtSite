<script setup lang="ts">
  import NavButtons from '+/home/NavButtons.vue'
  import Card from '+/layout/Card.vue'
  import VStack from '+/layout/VStack.vue'
  import Description from '+/premade/Description.vue'
  import Spacer from '+/utils/Spacer.vue'
</script>

<template>
  <Card :index="1" class="autoSpace">
    <VStack>
      <Description />
      <Spacer />
    </VStack>
    <NavButtons />
  </Card>
</template>
