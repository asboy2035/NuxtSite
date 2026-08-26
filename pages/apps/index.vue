<script setup lang="ts">
  const localePath = useLocalePath()

  await navigateTo(
    localePath({
      path: '/work',
      hash: '#apps',
    })
  )
</script>
