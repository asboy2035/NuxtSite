export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp()
  const { uwu } = useUwu()

  const originalT = $i18n.t.bind($i18n)

  $i18n.t = ((...args: Parameters<typeof $i18n.t>) => {
    const result = originalT(...args)

    if (!uwu.value || typeof result !== 'string') {
      return result
    }

    return uwuify(result, $i18n.locale.value)
  }) as typeof $i18n.t
})
