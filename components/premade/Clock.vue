<script setup lang="ts">
  import AnimatedText from '+/premade/AnimatedText.vue'

  const props = withDefaults(
    defineProps<{
      showSeconds?: boolean
      locale?: Intl.LocalesArgument
    }>(),
    {
      showSeconds: true,
      locale: undefined,
    }
  )

  const time = ref(new Date())

  let interval: ReturnType<typeof setInterval>

  const formatter = computed(
    () =>
      new Intl.DateTimeFormat(props.locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: props.showSeconds ? '2-digit' : undefined,
        hour12: false,
      })
  )

  onMounted(() => {
    interval = setInterval(() => {
      time.value = new Date()
    }, 1000)
  })

  onUnmounted(() => clearInterval(interval))

  const text = computed(() => formatter.value.format(time.value))
</script>

<template>
  <AnimatedText :text="text" character-class="clockDigit" class="clock" />
</template>

<style scoped lang="sass">
  @use "@/styles/fonts"

  .clock
    opacity: 0.6

  :deep(.clockDigit)
    font-size: 0.9rem
    font-family: fonts.$mono
</style>
