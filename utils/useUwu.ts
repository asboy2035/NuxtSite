import { computed } from 'vue'

export const useUwu = () => {
  const route = useRoute()

  const uwu = computed(() => 'uwu' in route.query)

  return {
    uwu,
  }
}
