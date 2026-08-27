<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import Card from '+/layout/Card.vue'
  import HStack from '+/layout/HStack.vue'
  import CodeBlock from '+/premade/CodeBlock.vue'
  import CardTitle from '+/utils/CardTitle.vue'
  import Modal from '+/utils/Modal.vue'

  const { t } = useI18n()

  const showingAddModal: Ref<boolean> = ref(false)

  const EmbedCode: string = `<a href="https://a35hie.me?utm_source=badge" target="_blank">
  <img
    src="https://a35hie.me/badges/a35hie.png"
    alt="Ashie's badge"
    width="88"
    height="31"
  >
</a>`

  interface Cutie {
    name: string
    url: string
    img: string
  }

  const Cuties: Cutie[] = [
    {
      name: 'Ashie',
      url: 'https://a35hie.me',
      img: '/badges/a35hie.png',
    },
    {
      name: 'Vorlie',
      url: 'https://vorlie.pl',
      img: 'https://vorlie.pl/images/vorlie.png',
    },
  ]
</script>

<template>
  <Modal v-if="showingAddModal" plain>
    <Card class="addCutieCard">
      <CardTitle title="footer.cuties.embed" icon="solar:code-bold-duotone">
        <button @click="showingAddModal = false">
          <Icon icon="mingcute:close-fill" />
        </button>
      </CardTitle>

      <CodeBlock lang="html" :code="EmbedCode" class="embedCode" />
    </Card>
  </Modal>

  <Card class="cutiesCard">
    <CardTitle title="footer.cuties.title" icon="solar:heart-line-duotone" />
    <p>{{ t('footer.cuties.desc') }}</p>

    <HStack class="cuties">
      <a
        v-for="cutie in Cuties"
        :key="cutie.name"
        :href="cutie.url"
        target="_blank"
        class="cutie"
      >
        <img :src="cutie.img" :alt="cutie.name" />
      </a>
    </HStack>

    <button @click="showingAddModal = true">
      <Icon icon="solar:code-bold-duotone" />
      {{ t('footer.cuties.embed') }}
    </button>
  </Card>
</template>

<style scoped lang="sass">
  .cutiesCard
    .cuties
      margin: 1rem 0
      gap: 0.5rem

      .cutie
        transition: 0.2s ease

        img
          width: 5.5rem
          border-radius: 0
          image-rendering: pixelated

        &:hover
          scale: 1.05

        &:active
          scale: 0.95

  .addCutieCard
    width: 100%
    max-width: 30rem

    .embedCode
      margin-top: 1rem

  @media (min-width: 35rem)
    .cutiesCard
      .cuties
        .cutie
          img
            width: 8rem
</style>
