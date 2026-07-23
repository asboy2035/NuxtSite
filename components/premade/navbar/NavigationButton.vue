<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  import type { NavLink } from ':/navLink'
  import HStack from '+/layout/HStack.vue'
  import SafeLink from '+/utils/SafeLink.vue'
  const { t } = useI18n()

  const router = useRouter()
  const localePath = useLocalePath()

  const props = defineProps<{
    link: NavLink
    expanded?: boolean
    index?: number
  }>()

  function isSelected(): boolean {
    return localePath(router.currentRoute.value.path).includes(props.link.link)
  }
</script>

<template>
  <div class="navWrapper">
    <div class="toolTip" v-if="!expanded">
      <h4>{{ t(link.text) }}</h4>
    </div>

    <SafeLink :to="link.link">
      <HStack
        class="navigationRow"
        :class="{ expanded }"
        :style="{ '--row-index': index }"
      >
        <button class="navigationButton" :class="{ prominent: isSelected() }">
          <Icon
            v-if="link.icon"
            :icon="
              isSelected()
                ? link.icon.replace('line-duotone', 'bold-duotone')
                : link.icon
            "
          />
          <slot />
        </button>

        <p class="navigationButtonText" v-if="expanded">{{ t(link.text) }}</p>
      </HStack>
    </SafeLink>
  </div>
</template>

<style scoped lang="sass">
  .navigationRow
    --row-index: 0

    &.expanded
      opacity: 0.4
      transform: translateY(2rem)
      animation: fadeInNavRow 0.2s ease forwards
      animation-delay: calc(0.05s * var(--row-index))

      @keyframes fadeInNavRow
        from
          opacity: 0.4
          transform: translateY(2rem)
        to
          opacity: 1
          transform: none

    .navigationButton
      width: 2.75rem
      height: 2.75rem
      transition: 0.2s ease-in-out
      padding: 0

      &:hover svg
        transform: rotate(10deg)

      svg
        height: 1.25rem
        width: 1.25rem
        transition: 0.1s ease

  // Tooltip Styling
  .toolTip
    display: none
    position: absolute
    background: var(--foregroundOpaque)
    padding: 0.5rem 0.75rem
    border-radius: 2rem
    white-space: nowrap
    z-index: 25
    animation: slideIn 0.2s ease-in-out forwards

    h4
      margin: 0

  // Show tooltip on hover
  .navWrapper:hover .toolTip
    display: flex
</style>
