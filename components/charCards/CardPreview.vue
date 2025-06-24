<script setup>
  import Card from "@/components/layout/Card.vue"
  import VStack from "@/components/layout/VStack.vue"
  import HStack from "@/components/layout/HStack.vue"
  import InteriorItem from "@/components/layout/InteriorItem.vue"

  defineProps(['data'])
</script>

<template>
  <card style="width: 350px; height: fit-content; padding: 0; border-radius: 1.5rem" >
    <div class="bannerContainer">
      <img :src="data.banner" alt="Banner">
    </div>

    <v-stack style="margin: 0.75rem; width: calc(100% - 1.5rem)">
      <h-stack style="margin-top: -4rem; z-index: 2;">
        <img :src="data.avatar" alt="Avatar" style="width: 5rem; height: 5rem; border-radius: 1.5rem; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.2);" />

        <v-stack class="tight" style="padding-bottom: 0.5rem; justify-content: flex-end; height: 100%">
          <h2 style="margin: 0">{{ data.name }}</h2>
          <p style="margin: 0;" class="light">{{ data.username }}</p>
        </v-stack>
      </h-stack>

      <v-stack>
        <p style="margin-top: 1rem; font-size: 0.9rem;">{{ data.bio }}</p>

        <h-stack class="light tight" v-if="data.url">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11"/></svg>
          <p style="margin-left: -0.2rem">{{ data.url }}</p>
        </h-stack>

        <v-stack>
          <h3>Interests</h3>

          <interior-item>
            <h-stack>
              <div
                v-for="(tag, i) in data.interests"
                :key="i"
                :style="`background-color: ${data.accent};`"
                class="interest"
              >
                <p>{{ tag }}</p>
              </div>
            </h-stack>
          </interior-item>
        </v-stack>
      </v-stack>
    </v-stack>
  </card>
</template>

<style scoped lang="sass">
  .interest
    color: white
    padding: 0.25rem
    border-radius: 0.5rem
    font-size: 0.75rem
    display: flex
    justify-content: center

  .bannerContainer, .bannerContainer > img
    height: 8rem
    width: 100%
    background-size: cover
    border-radius: 2rem

  ::v-deep(.interior)
    --interior-radius: 1.25re

  ::v-deep(.card)
    padding: 0

  ::v-deep(.card::before)
    display: none !important

  ::v-deep(.card::after), ::v-deep(.interior::after)
    box-shadow: none !important
</style>
