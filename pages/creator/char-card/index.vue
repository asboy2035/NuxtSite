<template>
  <div class="contentView">
    <hero image="/images/Creator.jpg">
      <h1>Character Card</h1>
      <h2>Create a character card.</h2>
    </hero>

    <grid class="spaced">
      <CustomizerPanel v-model="cardData" />
      <v-stack>
        <h1>Preview</h1>
        <CardPreview :data="cardData" ref="cardRef" />
      </v-stack>
    </grid>

    <navbar>
      <button @click="exportCard()">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12"/></svg>
        Download
      </button>
    </navbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import CustomizerPanel from '~/components/charCards/CustomizerPanel.vue'
  import CardPreview from '~/components/charCards/CardPreview.vue'
  import html2canvas from 'html2canvas'
  import VStack from "~/components/layout/VStack.vue"
  import Navbar from "~/components/premade/navbar/Navbar.vue"
  import Grid from "~/components/layout/Grid.vue"
  import Hero from "~/components/utils/Hero.vue"

  useHead({
    title: "Create Character Card",
    meta: [
      { name: "description", content: "Create your own personal character card." },
      { property: "og:title", content: "Create Character Card" },
      { property: "og:description", content: "Create your own personal character card." },
      { property: "og:image", content: "/images/Creator.jpg" }
    ]
  })

  const cardData = ref({
    name: '',
    username: '',
    bio: '',
    url: 'asboy2035.com',
    avatar: null,
    banner: null,
    interests: ['Existing', 'You', 'Computers'],
    accent: '#A084E8',
  })

  const cardRef = ref(null)

  const exportCard = async (includeBackground) => {
    const el = cardRef.value.$el
    const canvas = await html2canvas(el, {
      backgroundColor: includeBackground ? null : 'transparent'
    })
    const link = document.createElement('a')
    link.download = 'char-card.png'
    link.href = canvas.toDataURL()
    link.click()
  }
</script>
