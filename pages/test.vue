<script setup lang="ts">
  import Card from '+/layout/Card.vue'
</script>
<template>
  <div class="contentView">
    <!-- prettier-ignore -->
    <h1>A a B b C c D d E e F f G g H h I i J j K k L l M m N n O o P p Q q R r S s T t U u V v W w X x Y y Z z</h1>
    <!-- prettier-ignore -->
    <h1>А а Ә ә Б б В в Г г Ғ ғ Д д Е е Ё ё Ж ж З з И и Й й К к Қ қ Л л М м Н н Ң ң О о Ө ө П п Р р С с Т т У у Ұ ұ Ү ү Ф ф Х х Һ һ Ц ц Ч ч Ш ш Щ щ Ъ ъ Ы ы І і Ь ь Э э Ю ю Я я</h1>

    <div class="image">
      <Card class="lgCard"> Liquid glass </Card>
    </div>
  </div>
</template>

<style scoped lang="sass">
  .image
    background-image: url("/lgTest.png")
    background-size: cover
    background-position: center
    width: 100%
    height: 100vh
    justify-content: center
    padding: 1rem

  .lgCard
    max-height: 20rem
    min-height: 20rem
    width: 20rem
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

    &:hover
      scale: 1.1

    &:active
      scale: 0.95
</style>
